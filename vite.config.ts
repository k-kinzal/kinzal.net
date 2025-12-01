import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import { faceCropPlugin } from "@kinzal-net/vite-plugin-face-crop";
import { imageListPlugin } from "@kinzal-net/vite-plugin-image-list";
import { imageVariantsPlugin } from "@kinzal-net/vite-plugin-image-variants";
import compression from "vite-plugin-compression";

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
  plugins: [
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
    reactRouter(),
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
  },
}));
