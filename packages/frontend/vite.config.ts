import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { env } from './src/env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@monorepo/backend': resolve(__dirname, '../backend/dist')
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: env?.VITE_API_BASE_URL,
        changeOrigin: true
      }
    }
  }
});
