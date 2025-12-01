import fs from 'fs';
import path from 'path';
import https from 'https';
import { pipeline } from 'stream/promises';
import type { Logger } from 'imagetools-core';

const MODEL_REPO = 'deepghs/anime_face_detection';
const MODEL_PATH = 'face_detect_v1.4_s/model.onnx';
const MODEL_URL = `https://huggingface.co/${MODEL_REPO}/resolve/main/${MODEL_PATH}`;
const MODEL_FILENAME = 'anime_face_detection_v1.4_s.onnx';

let cacheDir: string | null = null;

/**
 * Sets the cache directory for storing downloaded models.
 * This should be called during plugin initialization with Vite's cacheDir.
 *
 * @param dir - The cache directory path
 */
export function setModelCacheDir(dir: string): void {
  cacheDir = dir;
}

function getCacheDir(): string {
  if (!cacheDir) {
    throw new Error(
      'Cache directory not configured. Make sure faceCropPlugin is added to Vite plugins before imagetools.'
    );
  }
  return path.join(cacheDir, 'models');
}

async function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);

    const request = (targetUrl: string) => {
      https
        .get(targetUrl, (response) => {
          // Handle redirects (Hugging Face uses redirects)
          if (response.statusCode === 301 || response.statusCode === 302) {
            const redirectUrl = response.headers.location;
            if (redirectUrl) {
              request(redirectUrl);
              return;
            }
          }

          if (response.statusCode !== 200) {
            fs.unlink(destPath, () => {});
            reject(new Error(`Download failed: HTTP ${response.statusCode}`));
            return;
          }

          pipeline(response, file)
            .then(() => resolve())
            .catch((err) => {
              fs.unlink(destPath, () => {});
              reject(err);
            });
        })
        .on('error', (err) => {
          fs.unlink(destPath, () => {});
          reject(err);
        });
    };

    request(url);
  });
}

/**
 * Ensures the YOLO face detection model is available locally.
 *
 * Downloads the model from Hugging Face if not already cached at
 * `~/.cache/vite-plugin-face-crop/models/`.
 *
 * @param logger - Logger instance from imagetools context
 * @returns Path to the model file, or null if download failed
 */
export async function ensureModelDownloaded(logger: Logger): Promise<string | null> {
  const cacheDir = getCacheDir();
  const localModelPath = path.join(cacheDir, MODEL_FILENAME);

  if (fs.existsSync(localModelPath)) {
    return localModelPath;
  }

  try {
    fs.mkdirSync(cacheDir, { recursive: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    logger.warn(`Failed to create cache directory: ${message}`);
    return null;
  }

  logger.info('Downloading face detection model...');

  const tempPath = `${localModelPath}.tmp`;

  try {
    await downloadFile(MODEL_URL, tempPath);

    fs.renameSync(tempPath, localModelPath);

    return localModelPath;
  } catch (e) {
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }

    const message = e instanceof Error ? e.message : String(e);
    logger.warn(`Failed to download model: ${message}`);
    return null;
  }
}

/**
 * Returns the expected local path for the YOLO model file.
 *
 * @returns The absolute path where the model is (or would be) cached
 */
export function getModelPath(): string {
  return path.join(getCacheDir(), MODEL_FILENAME);
}
