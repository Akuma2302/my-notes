import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath } from 'node:url';

// Normal build: web app that talks to the backend API.
// "static" mode (npm run build:phone): one offline HTML file with the notes built in.
export default defineConfig(({ mode }) => {
  const phone = mode === 'static';
  return {
    plugins: [react(), ...(phone ? [viteSingleFile()] : [])],
    base: './',
    resolve: {
      alias: { '@seed': fileURLToPath(new URL('../database/seeds/data', import.meta.url)) }
    },
    server: {
      port: 5173,
      proxy: { '/api': 'http://localhost:5000' }
    },
    build: {
      outDir: phone ? 'dist-phone' : 'dist',
      emptyOutDir: true
    }
  };
});
