import { defineConfig } from 'vite';
import path from 'path';
import autoprefixer from 'autoprefixer';
import purgecss from '@fullhuman/postcss-purgecss';

export default defineConfig({
    // root: './', // Default
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                original: path.resolve(__dirname, 'original.html'),
                scrap: path.resolve(__dirname, 'scrap.html')
            }
        },
        minify: 'terser', // Use terser for better minification control if needed, or default 'esbuild'
    },
    css: {
        postcss: {
            plugins: [
                autoprefixer(),
                purgecss({
                    content: [
                        './*.html',
                        './app/**/*.js',
                        './app/**/*.html' // In case there are partials?
                    ],
                    safelist: [
                        // Add any classes that might be dynamically added and missed by purgecss
                        // Gruntfile had ignore: [/:target/, /:not/]
                        /:target/,
                        /:not/
                    ]
                })
            ]
        }
    }
});
