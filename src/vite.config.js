import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import '@testing-library/jest-dom';

export default defineConfig({
  plugins: [react()],
});
