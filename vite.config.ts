import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        muffler: path.resolve(__dirname, 'muffler-repair-anaheim.html'),
        catalytic: path.resolve(__dirname, 'catalytic-converter-anaheim.html'),
        brake: path.resolve(__dirname, 'brake-repair-anaheim.html'),
        engine: path.resolve(__dirname, 'engine-repair-anaheim.html'),
        transmission: path.resolve(__dirname, 'transmission-repair-anaheim.html'),
        maintenance: path.resolve(__dirname, 'auto-maintenance-anaheim.html'),
        contact: path.resolve(__dirname, 'contact.html'),
        privacy: path.resolve(__dirname, 'privacy.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});