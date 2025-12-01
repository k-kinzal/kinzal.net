import type { FaceRect } from './types.js';
import type { Logger } from 'imagetools-core';
import { setModelCacheDir } from './model-downloader.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let animedetectFn: ((imagePath: string) => Promise<any>) | false | null = null;
let yoloDetectorFn: ((imagePath: string, logger: Logger) => Promise<FaceRect | null>) | false | null = null;

let detectionMutex: Promise<void> = Promise.resolve();

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
      const mod = await import('animedetect');
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
      const mod = await import('./yolo-face-detector.js');
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
      if (message.includes('cv.Mat is not a constructor') && retryCount < 1) {
        return runDetection(retryCount + 1);
      }
      throw e;
    }
  };

  return runDetection();
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
 * 1. animedetect (LBP cascade, fast, ~83% accuracy)
 * 2. YOLO v1.4_s (deep learning, slower, ~95% accuracy)
 *
 * @param imagePath - Absolute path to the image file
 * @param logger - Logger instance from imagetools context
 * @returns The largest detected face rectangle, or null if no face found
 */
export async function detectAnimeFace(imagePath: string, logger: Logger): Promise<FaceRect | null> {
  let releaseMutex: () => void;
  const previousMutex = detectionMutex;
  detectionMutex = new Promise<void>((resolve) => {
    releaseMutex = resolve;
  });

  try {
    await previousMutex;

    try {
      const primaryResult = await detectWithAnimedetect(imagePath);
      if (primaryResult) {
        return primaryResult;
      }
    } catch {
      // animedetect failed, will try YOLO fallback
    }

    try {
      const fallbackResult = await detectWithYOLO(imagePath, logger);
      if (fallbackResult) {
        return fallbackResult;
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      logger.warn(`YOLO fallback error: ${message}`);
    }

    return null;
  } finally {
    releaseMutex!();
  }
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
