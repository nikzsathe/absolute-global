import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

// Serves the SPA for legacy .html URLs (e.g. /faq.html, /b2b/index.html) so the
// client-side legacy redirects in App.jsx can resolve them. For static production
// hosting, map legacy .html URLs to '/' (see ROUTE_MAPPING.md).
const legacyHtmlFallback = () => {
  const handler = (req, res, next) => {
    const url = (req.url || '').split('?')[0];
    if (req.method === 'GET' && url.endsWith('.html')) {
      const file = path.join(server.config.publicDir, url);
      if (!fs.existsSync(file)) {
        req.url = '/';
      }
    }
    next();
  };
  let server;
  return {
    name: 'legacy-html-fallback',
    apply: 'serve',
    configureServer(s) {
      server = s;
      s.middlewares.use(handler);
    },
    configurePreviewServer(s) {
      server = s;
      s.middlewares.use(handler);
    }
  };
};

export default defineConfig({
  plugins: [react(), legacyHtmlFallback()],
});
