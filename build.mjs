import { build } from 'vite';

await build({
  configFile: 'vite.config.mjs',
  root: '.',
  base: '/',
  plugins: [import('@vitejs/plugin-react-swc').then(m => m.default)()],
  build: {
    esbuild: false,
    target: 'es2020'
  },
  optimizeDeps: {
    disabled: true
  }
});

console.log('Build successful');