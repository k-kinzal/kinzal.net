# @kinzal-net/vite-plugin-image-variants

A Vite plugin that generates image variant imports for [vite-imagetools](https://github.com/JonasKruckenberg/imagetools).

## Features

- Scans for image files and generates static imports with query parameters
- Works with vite-imagetools for on-demand image transformation
- Uses `import.meta.glob` for lazy loading in both dev and production
- Provides a virtual module `virtual:image-variants` with all variant loaders
- Hot reload support - automatically updates when images are added/removed
- TypeScript support with full type definitions

## Installation

```bash
npm install @kinzal-net/vite-plugin-image-variants
```

## Usage

### Configure Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { imageVariantsPlugin } from '@kinzal-net/vite-plugin-image-variants';

export default defineConfig({
  plugins: [
    imagetools(),
    imageVariantsPlugin({
      input: './app/images/**/*.{jpg,jpeg,png}',
      queries: [
        'w=400&h=400&fit=cover&format=avif',
        'w=400&h=400&fit=cover&format=webp',
        'w=400&h=400&fit=cover',
        'w=1920&fit=inside&format=avif',
      ],
    }),
  ],
});
```

### Use in Your Code

```ts
import { imageVariants } from 'virtual:image-variants';

// Get variant loader for a specific image and query
const loadAvif = imageVariants['/app/images/photo.jpg']['w=400&format=avif'];

// Lazy load the image
const url = await loadAvif();
```

### With React

```tsx
import { useState, useEffect } from 'react';
import { imageVariants } from 'virtual:image-variants';

function OptimizedImage({ src }: { src: string }) {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    const loader = imageVariants[src]?.['w=400&format=avif'];
    if (loader) {
      loader().then(setUrl);
    }
  }, [src]);

  if (!url) return <div>Loading...</div>;
  return <img src={url} alt="" />;
}
```

## Configuration

### Plugin Options

| Option    | Type       | Required | Description                                         |
| --------- | ---------- | -------- | --------------------------------------------------- |
| `input`   | `string`   | Yes      | Glob pattern to match image files                   |
| `queries` | `string[]` | Yes      | Array of query strings for image transformations    |

### Query String Format

Query strings follow the vite-imagetools format:

```ts
queries: [
  'w=400&h=400&fit=cover&format=avif',  // 400x400 cover crop, AVIF
  'w=800&format=webp&quality=80',        // 800px width, WebP, 80% quality
  'w=1920&fit=inside',                   // Max 1920px, maintain aspect ratio
]
```

See [vite-imagetools documentation](https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md) for all available directives.

## TypeScript Support

Add the type declaration to your project:

```ts
// vite-env.d.ts or global.d.ts
declare module 'virtual:image-variants' {
  type ImageVariantLoader = () => Promise<string>;
  type ImageVariants = Record<string, Record<string, ImageVariantLoader>>;
  export const imageVariants: ImageVariants;
}
```

Or import the types from the package:

```ts
import type { ImageVariants, ImageVariantLoader } from '@kinzal-net/vite-plugin-image-variants';
```

## How It Works

1. The plugin scans for image files matching the `input` glob pattern
2. For each image and query combination, it generates an `import.meta.glob` entry
3. The virtual module exports an object mapping file paths to query-loader pairs
4. Loaders are functions that return a Promise resolving to the transformed image URL
5. On changes (add/remove), the virtual module is invalidated and triggers a full reload

## Generated Module Structure

The virtual module generates code similar to:

```ts
const glob0 = import.meta.glob('/app/images/**/*.{jpg,png}', { query: 'w=400&format=avif', import: 'default' });
const glob1 = import.meta.glob('/app/images/**/*.{jpg,png}', { query: 'w=800&format=webp', import: 'default' });

export const imageVariants = {
  '/app/images/photo.jpg': {
    'w=400&format=avif': glob0['/app/images/photo.jpg'],
    'w=800&format=webp': glob1['/app/images/photo.jpg'],
  },
  // ...
};
```

## Supported Image Extensions

By default, the plugin monitors files with these extensions:
- jpg, jpeg, png, gif, webp, avif

## Requirements

- Node.js >= 18.0.0
- Vite >= 5.0.0
- vite-imagetools (peer dependency for image transformations)

## License

MIT
