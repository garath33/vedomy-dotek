import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Use relative base so static files work seamlessly whether served from
  // a root custom domain, a subpath like /repo-name/ on GitHub Pages,
  // or a preview staging directory.
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        oMartinovi: resolve(__dirname, 'o-martinovi.html'),
        reference: resolve(__dirname, 'reference.html'),
        cenik: resolve(__dirname, 'cenik.html'),
        faq: resolve(__dirname, 'faq.html'),
        kontakt: resolve(__dirname, 'kontakt.html'),
        storno: resolve(__dirname, 'storno-podminky.html')
      }
    }
  }
});
