# @kinzal-net/vite-plugin-image-list

A Vite plugin that provides image file list as a virtual module.

## Features

- Scans for image files matching a glob pattern
- Provides a virtual module `virtual:image-list` with the file list
- Supports custom transformation of the file list
- Hot reload support - automatically updates when images are added/removed
- TypeScript support with full type definitions

## Installation

```bash
npm install @kinzal-net/vite-plugin-image-list
```

## Usage

### Basic Usage (Flat Array)

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { imageListPlugin } from '@kinzal-net/vite-plugin-image-list';

export default defineConfig({
  plugins: [
    imageListPlugin({
      input: './images/**/*.{jpg,png}',
    }),
  ],
});
```

```ts
// In your code
import { imageList } from 'virtual:image-list';

// imageList = ['images/foo/img1.jpg', 'images/bar/img2.png']
```

### With Transform (Grouped by Directory)

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { imageListPlugin } from '@kinzal-net/vite-plugin-image-list';

export default defineConfig({
  plugins: [
    imageListPlugin({
      input: './images/**/*.{jpg,png}',
      transform: (files) => {
        const groups: Record<string, string[]> = {};
        for (const file of files) {
          const parts = file.split('/');
          const category = parts[parts.length - 2] || 'default';
          const filename = parts[parts.length - 1];
          (groups[category] ??= []).push(filename);
        }
        return groups;
      },
    }),
  ],
});
```

```ts
// In your code
import { imageList } from 'virtual:image-list';

// imageList = { foo: ['img1.jpg'], bar: ['img2.png'] }
```

## Configuration

### Plugin Options

| Option      | Type                         | Required | Description                                      |
| ----------- | ---------------------------- | -------- | ------------------------------------------------ |
| `input`     | `string`                     | Yes      | Glob pattern to match image files                |
| `transform` | `(files: string[]) => T`     | No       | Custom function to transform the file list       |

## TypeScript Support

For TypeScript support, add the type declaration to your project:

```ts
// vite-env.d.ts or global.d.ts
declare module 'virtual:image-list' {
  export const imageList: string[];
}

// Or with custom transform type
declare module 'virtual:image-list' {
  export const imageList: Record<string, string[]>;
}
```

## How It Works

1. The plugin scans for image files matching the `input` glob pattern
2. Results are cached and sorted alphabetically
3. On changes (add/remove), the virtual module is invalidated and triggers a full reload
4. The `transform` function (if provided) converts the file list to your desired structure

## Supported Image Extensions

By default, the plugin monitors files with these extensions:
- jpg, jpeg, png, gif, webp, avif

## Requirements

- Node.js >= 18.0.0
- Vite >= 5.0.0

## License

MIT
