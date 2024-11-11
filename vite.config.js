import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this matches your desired output folder
    assetsDir: 'assets', // This should also be where your assets (like SVGs) are placed
    assetsInclude: ['**/*.svg'], // Ensure SVGs are included
  },
});

