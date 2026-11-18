import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  // On GitHub Pages a project site lives at /<repo>/, so CI sets BASE_PATH.
  // Locally this falls back to "/".
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    watch: {
      // Never watch build output: `npm run build` writes to dist/ and
      // dist-ssr/ while dev may be running.
      ignored: ['**/dist/**', '**/dist-ssr/**'],
      // On Windows a newly written file (build output, but also assets such
      // as a .woff2 copied in by a tool or scanned by antivirus) can be
      // locked for a moment. The native watcher fails with EBUSY while
      // opening it and the whole dev server exits. Polling never opens a
      // watch handle, so it cannot hit that error.
      usePolling: true,
      interval: 300,
    },
  },
  build: {
    rollupOptions: {
      output: {
        // The prerender build externalises React, so only split vendor
        // chunks for the browser bundle.
        manualChunks: isSsrBuild
          ? undefined
          : {
              'vendor-react': ['react', 'react-dom'],
              'vendor-icons': ['lucide-react'],
            },
      },
    },
  },
}));
