import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc'
    }
  },
  build: {
    outDir: 'dist', // Ensure this matches your desired output folder
    assetsDir: 'assets', // This should also be where your assets (like SVGs) are placed
    assetsInclude: ['**/*.svg'], // Ensure SVGs are included
  },
});
