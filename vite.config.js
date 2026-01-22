/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    root: 'src/client',
    build: {
        outDir: '../../public',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: false, // ← forces a single JS file
                entryFileNames: 'app.js',
                assetFileNames: 'app.[ext]',
            },
        },
    },
    resolve: {
        alias: {
            '@interfaces': resolve(__dirname, './src/interfaces'),
            '@util': resolve(__dirname, './src/util'),
            '@server': resolve(__dirname, './src/server'),
            '@client': resolve(__dirname, './src/client'),
            '@process': resolve(__dirname, './src/process'),
        },
    },
    test: {
        root: resolve(__dirname, './tests'),
    },
});
