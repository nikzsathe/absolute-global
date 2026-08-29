import { defineConfig } from 'vite'
export default defineConfig({
  root: '.',
  base: '',
  publicDir: false,
  plugins: [],
  optimizeDeps: {
    disabled: true
  },
  build: {
    esbuild: false,
    target: 'es2020',
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})