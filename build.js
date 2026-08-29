import { defineConfig } from 'vite'
import { build } from 'vite'

const config = defineConfig({
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

build(config).then(() => {
  console.log('Build successful')
}).catch((err) => {
  console.error('Build failed:', err)
  process.exit(1)
})