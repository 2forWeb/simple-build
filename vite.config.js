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
            '@interfaces/*': resolve(__dirname, './interfaces'),
            '@util/*': resolve(__dirname, './util'),
            '@server/*': resolve(__dirname, './server'),
            '@client/*': resolve(__dirname, './client'),
            '@process/*': resolve(__dirname, './process'),
        },
    },
});
