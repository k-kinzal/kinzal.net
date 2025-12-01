# @kinzal-net/vite-plugin-face-crop

A face detection transform for [vite-imagetools](https://github.com/JonasKruckenberg/imagetools) that automatically crops images to center on detected anime/illustration faces.

## Features

- Automatic anime/illustration face detection
- Fallback detection chain for high accuracy:
  1. **animedetect** (LBP cascade) - Fast, ~83% accuracy
  2. **YOLO v1.4_s** (deep learning) - Slower, ~95% accuracy
- Configurable padding around detected faces
- Seamless integration with vite-imagetools

## Installation

```bash
npm install @kinzal-net/vite-plugin-face-crop
```

## Usage

### Configure Vite

Add the plugin to your `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { faceCropPlugin } from '@kinzal-net/vite-plugin-face-crop';

const faceCrop = faceCropPlugin();

export default defineConfig({
  plugins: [
    faceCrop,
    imagetools({
      extendTransforms: (builtins) => [faceCrop.getTransform(), ...builtins],
    }),
  ],
});
```

**Important:** The `faceCrop` plugin must be added before `imagetools` to ensure proper initialization.

### Import Images

Use the `faceCrop` directive in your image imports:

```ts
// Basic usage
import avatar from './character.jpg?faceCrop&w=200&h=200';

// With format conversion
import optimized from './character.png?faceCrop&w=400&format=avif';

// Combine with other imagetools directives
import thumbnail from './character.jpg?faceCrop&w=100&h=100&format=webp&quality=80';
```

## Configuration

### Plugin Options

```ts
faceCropPlugin({
  padding: 2.0,   // Padding multiplier around the detected face (default: 2.0)
  cacheDir: './', // Custom cache directory (default: uses Vite's cacheDir)
});
```

| Option     | Type     | Default              | Description                                                                   |
| ---------- | -------- | -------------------- | ----------------------------------------------------------------------------- |
| `padding`  | `number` | `2.0`                | Multiplier for the crop area. A value of 2.0 doubles the detected face area. |
| `cacheDir` | `string` | Vite's `cacheDir`    | Custom directory for storing downloaded models.                               |

## How It Works

1. When an image with the `?faceCrop` directive is imported, the plugin detects faces in the image
2. It first tries the fast animedetect library (LBP cascade-based)
3. If no face is found, it falls back to a YOLO deep learning model for higher accuracy
4. The detected face is converted to a square region
5. Padding is applied to include surrounding context
6. The image is cropped to the calculated region

## Model Download

The YOLO model is automatically downloaded from Hugging Face on first use and cached at:

```
<vite-cacheDir>/vite-plugin-face-crop/models/anime_face_detection_v1.4_s.onnx
```

By default, this resolves to `node_modules/.vite/vite-plugin-face-crop/models/`.

## Dependencies

- [animedetect](https://www.npmjs.com/package/animedetect) - Fast LBP cascade face detection
- [onnxruntime-node](https://www.npmjs.com/package/onnxruntime-node) - ONNX model inference
- [sharp](https://www.npmjs.com/package/sharp) - Image processing

## Requirements

- Node.js >= 18.0.0
- vite >= 5.0.0
- imagetools-core >= 9.0.0

## License

MIT
