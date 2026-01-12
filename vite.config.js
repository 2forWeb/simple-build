import { defineConfig } from 'vite';
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
});
