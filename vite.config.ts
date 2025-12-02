import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import { faceCropPlugin } from "@kinzal-net/vite-plugin-face-crop";
import { imageListPlugin } from "@kinzal-net/vite-plugin-image-list";
import { imageVariantsPlugin } from "@kinzal-net/vite-plugin-image-variants";
import compression from "vite-plugin-compression";

/**
 * Plugin to replace SSR manifest with an empty one.
 * vite-react-ssg forces ssrManifest: true, but we don't need it
 * and it causes "Invalid string length" errors with many image assets.
 *
 * This plugin replaces the vite:ssr-manifest plugin to output an empty manifest.
 */
function disableSsrManifest(): Plugin {
  return {
    name: 'disable-ssr-manifest',
    enforce: 'post',
    configResolved(config) {
      // Find and replace the vite:ssr-manifest plugin
      const plugins = config.plugins as Plugin[];
      const ssrManifestIndex = plugins.findIndex(p => p.name === 'vite:ssr-manifest');
      if (ssrManifestIndex !== -1) {
        // Replace with a plugin that outputs an empty manifest
        plugins[ssrManifestIndex] = {
          name: 'vite:ssr-manifest',
          generateBundle(_options, _bundle) {
            this.emitFile({
              type: 'asset',
              fileName: '.vite/ssr-manifest.json',
              source: '{}',
            });
          },
        };
      }
    },
  };
}

const faceCrop = faceCropPlugin();

// vite-imagetools query strings
const QUERIES = [
  // thumb-sm (200x200 with face crop)
  'faceCrop&w=200&h=200&fit=cover&format=avif',
  'faceCrop&w=200&h=200&fit=cover&format=webp',
  'faceCrop&w=200&h=200&fit=cover',
  // thumb-md (400x400 with face crop)
  'faceCrop&w=400&h=400&fit=cover&format=avif',
  'faceCrop&w=400&h=400&fit=cover&format=webp',
  'faceCrop&w=400&h=400&fit=cover',
  // thumb-lg (600x600 with face crop)
  'faceCrop&w=600&h=600&fit=cover&format=avif',
  'faceCrop&w=600&h=600&fit=cover&format=webp',
  'faceCrop&w=600&h=600&fit=cover',
  // full (1920 max width, no face crop)
  'w=1920&fit=inside&format=avif',
  'w=1920&fit=inside&format=webp',
  'w=1920&fit=inside',
];

export default defineConfig(() => ({
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
  plugins: [
    disableSsrManifest(),
    faceCrop,
    imagetools({
      extendTransforms: (builtins) => [faceCrop.getTransform(), ...builtins],
    }),
    imageListPlugin({
      input: './app/images',
      categories: ['original', 'scrap'],
      extensions: ['jpg', 'jpeg', 'png'],
    }),
    imageVariantsPlugin({
      input: './app/images/**/*.{jpg,jpeg,png}',
      queries: QUERIES,
    }),
    react(),
    tailwindcss(),
    // Generate gzip compressed files for static assets
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files > 1KB
      deleteOriginFile: false,
    }),
    // Generate brotli compressed files for static assets
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  build: {
    // Enable minification with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: true,
      format: {
        comments: false, // Remove comments
      },
    },
    // Optimize CSS
    cssMinify: 'lightningcss',
    // Enable source maps for debugging (optional, can be disabled for smaller builds)
    sourcemap: false,
    rollupOptions: {
      output: {
        // Merge all image modules into the main bundle
        manualChunks: (id) => {
          // Image modules from vite-imagetools (have query parameters for image processing)
          if (id.includes('?') && /\.(jpg|jpeg|png|gif|webp|avif)/.test(id)) {
            return 'images';
          }
          return undefined;
        },
      },
    },
  },
}));
