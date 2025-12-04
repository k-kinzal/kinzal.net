import type { FaceRect } from "./types.js";
import type { Logger } from "imagetools-core";
import { setModelCacheDir } from "./model-downloader.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let animedetectFn: ((imagePath: string) => Promise<any>) | false | null = null;
let yoloDetectorFn:
  | ((imagePath: string, logger: Logger) => Promise<FaceRect | null>)
  | false
  | null = null;

/**
 * Simple semaphore for limiting concurrent operations.
 */
class Semaphore {
  private permits: number;
  private waiting: (() => void)[] = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return;
    }
    return new Promise<void>((resolve) => {
      this.waiting.push(resolve);
    });
  }

  release(): void {
    const next = this.waiting.shift();
    if (next) {
      next();
    } else {
      this.permits++;
    }
  }
}

const animedetectSemaphore = new Semaphore(1);

/**
 * Sets the cache directory for storing downloaded models.
 * This is called by the Vite plugin during configResolved.
 *
 * @param dir - The cache directory path
 */
export function setCacheDir(dir: string): void {
  setModelCacheDir(dir);
}

async function initAnimedetect(): Promise<typeof animedetectFn> {
  if (animedetectFn === null) {
    try {
      const mod = await import("animedetect");
      animedetectFn = mod.animedetect;
    } catch {
      animedetectFn = false;
    }
  }
  return animedetectFn;
}

async function initYOLODetector(logger: Logger): Promise<typeof yoloDetectorFn> {
  if (yoloDetectorFn === null) {
    try {
      const mod = await import("./yolo-face-detector.js");
      yoloDetectorFn = mod.detectAnimeFaceYOLO;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      logger.warn(`YOLO face detector not available: ${message}`);
      yoloDetectorFn = false;
    }
  }
  return yoloDetectorFn;
}

async function detectWithAnimedetect(imagePath: string): Promise<FaceRect | null> {
  const detector = await initAnimedetect();

  if (!detector) {
    return null;
  }

  await animedetectSemaphore.acquire();
  try {
    const runDetection = async (retryCount = 0): Promise<FaceRect | null> => {
      try {
        const result = await detector(imagePath);
        if (result && result.objects && result.objects.size() > 0) {
          let largest: FaceRect | null = null;
          let largestArea = 0;

          for (let i = 0; i < result.objects.size(); i++) {
            const rect = result.objects.get(i);
            const area = rect.width * rect.height;
            if (area > largestArea) {
              largestArea = area;
              largest = {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height,
              };
            }
          }

          return largest;
        }
        return null;
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        if (message.includes("cv.Mat is not a constructor") && retryCount < 1) {
          return runDetection(retryCount + 1);
        }
        throw e;
      }
    };

    return await runDetection();
  } finally {
    animedetectSemaphore.release();
  }
}

async function detectWithYOLO(imagePath: string, logger: Logger): Promise<FaceRect | null> {
  const detector = await initYOLODetector(logger);

  if (!detector) {
    return null;
  }

  return detector(imagePath, logger);
}

/**
 * Detects an anime/illustration face in an image using a fallback chain.
 *
 * Detection order:
 * 1. YOLO v1.4_s (deep learning, ~95% accuracy, parallelizable)
 * 2. animedetect (LBP cascade, ~83% accuracy, serialized fallback)
 *
 * @param imagePath - Absolute path to the image file
 * @param logger - Logger instance from imagetools context
 * @returns The largest detected face rectangle, or null if no face found
 */
export async function detectAnimeFace(imagePath: string, logger: Logger): Promise<FaceRect | null> {
  try {
    const yoloResult = await detectWithYOLO(imagePath, logger);
    if (yoloResult) {
      return yoloResult;
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    logger.warn(`YOLO detection error: ${message}`);
  }

  try {
    const animedetectResult = await detectWithAnimedetect(imagePath);
    if (animedetectResult) {
      return animedetectResult;
    }
  } catch {
    // animedetect failed, no face found
  }

  return null;
}

/**
 * Preloads face detection models to reduce latency on first detection.
 *
 * Call this at build start to initialize models early rather than
 * on-demand during the first image processing.
 *
 * @param logger - Logger instance from imagetools context
 */
export async function preloadDetectors(logger: Logger): Promise<void> {
  await Promise.all([initAnimedetect(), initYOLODetector(logger)]);
}
