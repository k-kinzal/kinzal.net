import * as ort from "onnxruntime-node";
import sharp from "sharp";
import type { FaceRect } from "./types.js";
import { ensureModelDownloaded } from "./model-downloader.js";
import type { Logger } from "imagetools-core";

const MODEL_INPUT_SIZE = 640;
const CONF_THRESHOLD = 0.25;
const IOU_THRESHOLD = 0.7;

let session: ort.InferenceSession | null = null;
let sessionPromise: Promise<ort.InferenceSession | null> | null = null;
let sessionFailed = false;

async function getSession(logger: Logger): Promise<ort.InferenceSession | null> {
  if (sessionFailed) {
    return null;
  }

  if (session) {
    return session;
  }

  if (sessionPromise) {
    return sessionPromise;
  }

  sessionPromise = (async () => {
    const modelPath = await ensureModelDownloaded(logger);

    if (!modelPath) {
      sessionFailed = true;
      return null;
    }

    try {
      session = await ort.InferenceSession.create(modelPath, {
        executionProviders: ["cpu"],
        graphOptimizationLevel: "all",
      });

      return session;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      logger.warn(`Failed to load YOLO model: ${message}`);
      sessionFailed = true;
      return null;
    }
  })();

  return sessionPromise;
}

interface PreprocessResult {
  tensor: ort.Tensor;
  originalWidth: number;
  originalHeight: number;
  scale: number;
  padX: number;
  padY: number;
}

async function preprocessImage(imagePath: string): Promise<PreprocessResult> {
  const metadata = await sharp(imagePath).metadata();
  const originalWidth = metadata.width!;
  const originalHeight = metadata.height!;

  const scale = Math.min(MODEL_INPUT_SIZE / originalWidth, MODEL_INPUT_SIZE / originalHeight);

  const scaledWidth = Math.round(originalWidth * scale);
  const scaledHeight = Math.round(originalHeight * scale);

  const padX = Math.floor((MODEL_INPUT_SIZE - scaledWidth) / 2);
  const padY = Math.floor((MODEL_INPUT_SIZE - scaledHeight) / 2);

  const resized = await sharp(imagePath)
    .resize(scaledWidth, scaledHeight, { fit: "fill" })
    .extend({
      top: padY,
      bottom: MODEL_INPUT_SIZE - scaledHeight - padY,
      left: padX,
      right: MODEL_INPUT_SIZE - scaledWidth - padX,
      background: { r: 114, g: 114, b: 114 },
    })
    .removeAlpha()
    .raw()
    .toBuffer();

  const float32Data = new Float32Array(3 * MODEL_INPUT_SIZE * MODEL_INPUT_SIZE);
  const pixelCount = MODEL_INPUT_SIZE * MODEL_INPUT_SIZE;

  for (let i = 0; i < pixelCount; i++) {
    float32Data[i] = resized[i * 3]! / 255.0;
    float32Data[pixelCount + i] = resized[i * 3 + 1]! / 255.0;
    float32Data[2 * pixelCount + i] = resized[i * 3 + 2]! / 255.0;
  }

  const tensor = new ort.Tensor("float32", float32Data, [1, 3, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE]);

  return {
    tensor,
    originalWidth,
    originalHeight,
    scale,
    padX,
    padY,
  };
}

interface Detection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  confidence: number;
}

function calculateIoU(a: Detection, b: Detection): number {
  const x1 = Math.max(a.x1, b.x1);
  const y1 = Math.max(a.y1, b.y1);
  const x2 = Math.min(a.x2, b.x2);
  const y2 = Math.min(a.y2, b.y2);

  if (x2 <= x1 || y2 <= y1) return 0;

  const intersection = (x2 - x1) * (y2 - y1);
  const areaA = (a.x2 - a.x1) * (a.y2 - a.y1);
  const areaB = (b.x2 - b.x1) * (b.y2 - b.y1);
  const union = areaA + areaB - intersection;

  return union > 0 ? intersection / union : 0;
}

function applyNMS(detections: Detection[]): Detection[] {
  if (detections.length === 0) return [];

  const sorted = [...detections].sort((a, b) => b.confidence - a.confidence);
  const selected: Detection[] = [];

  while (sorted.length > 0) {
    const current = sorted.shift()!;
    selected.push(current);

    for (let i = sorted.length - 1; i >= 0; i--) {
      if (calculateIoU(current, sorted[i]!) > IOU_THRESHOLD) {
        sorted.splice(i, 1);
      }
    }
  }

  return selected;
}

function postprocessOutput(
  output: ort.Tensor,
  originalWidth: number,
  originalHeight: number,
  scale: number,
  padX: number,
  padY: number
): FaceRect | null {
  const data = output.data as Float32Array;
  const dims = output.dims;

  let numDetections: number;
  let getDetection: (
    i: number
  ) => { cx: number; cy: number; w: number; h: number; confidence: number } | null;

  if (dims.length === 3) {
    if (dims[1] === 5) {
      numDetections = dims[2]!;
      getDetection = (i: number) => {
        const cx = data[i]!;
        const cy = data[numDetections + i]!;
        const w = data[2 * numDetections + i]!;
        const h = data[3 * numDetections + i]!;
        const confidence = data[4 * numDetections + i]!;
        return { cx, cy, w, h, confidence };
      };
    } else {
      numDetections = dims[1]!;
      getDetection = (i: number) => {
        const base = i * 5;
        const cx = data[base]!;
        const cy = data[base + 1]!;
        const w = data[base + 2]!;
        const h = data[base + 3]!;
        const confidence = data[base + 4]!;
        return { cx, cy, w, h, confidence };
      };
    }
  } else {
    return null;
  }

  const detections: Detection[] = [];

  for (let i = 0; i < numDetections; i++) {
    const det = getDetection(i);
    if (!det || det.confidence < CONF_THRESHOLD) continue;

    const { cx, cy, w, h, confidence } = det;

    let x1 = cx - w / 2;
    let y1 = cy - h / 2;
    let x2 = cx + w / 2;
    let y2 = cy + h / 2;

    x1 = (x1 - padX) / scale;
    y1 = (y1 - padY) / scale;
    x2 = (x2 - padX) / scale;
    y2 = (y2 - padY) / scale;

    x1 = Math.max(0, Math.min(originalWidth, x1));
    y1 = Math.max(0, Math.min(originalHeight, y1));
    x2 = Math.max(0, Math.min(originalWidth, x2));
    y2 = Math.max(0, Math.min(originalHeight, y2));

    if (x2 > x1 && y2 > y1) {
      detections.push({ x1, y1, x2, y2, confidence });
    }
  }

  if (detections.length === 0) return null;

  const filtered = applyNMS(detections);

  if (filtered.length === 0) return null;

  let largest: FaceRect | null = null;
  let largestArea = 0;

  for (const box of filtered) {
    const width = box.x2 - box.x1;
    const height = box.y2 - box.y1;
    const area = width * height;

    if (area > largestArea) {
      largestArea = area;
      largest = {
        x: Math.round(box.x1),
        y: Math.round(box.y1),
        width: Math.round(width),
        height: Math.round(height),
      };
    }
  }

  return largest;
}

/**
 * Detects an anime/illustration face using the YOLO v1.4_s model.
 *
 * This detector uses deep learning for high accuracy (~95%) but is slower
 * than the LBP cascade-based animedetect. It serves as a fallback when
 * animedetect fails to find a face.
 *
 * @param imagePath - Absolute path to the image file
 * @param logger - Logger instance from imagetools context
 * @returns The largest detected face rectangle, or null if no face found
 */
export async function detectAnimeFaceYOLO(
  imagePath: string,
  logger: Logger
): Promise<FaceRect | null> {
  try {
    const sess = await getSession(logger);

    if (!sess) {
      return null;
    }

    const { tensor, originalWidth, originalHeight, scale, padX, padY } =
      await preprocessImage(imagePath);

    const inputName = sess.inputNames[0]!;
    const feeds: Record<string, ort.Tensor> = { [inputName]: tensor };

    const results = await sess.run(feeds);

    const outputName = sess.outputNames[0]!;
    const output = results[outputName]!;

    const faceRect = postprocessOutput(output, originalWidth, originalHeight, scale, padX, padY);

    return faceRect;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.warn(`YOLO detection error: ${message}`);
    return null;
  }
}
