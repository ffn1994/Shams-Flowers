import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/siteConfig.js';

const ROUTES = ['/', '/bouquets', '/contact'];

/**
 * يحط دومين الموقع في وسوم المشاركة، ويولّد robots.txt و sitemap.xml
 * من نفس المصدر (src/siteConfig.js) عشان ما ينسى أحد يحدّثهم.
 */
function siteMetaPlugin() {
  const origin = site.url.replace(/\/$/, '');

  return {
    name: 'shams-site-meta',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', origin);
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
      });

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (route) => `  <url>
    <loc>${origin}${route}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
).join('\n')}
</urlset>
`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMetaPlugin()],
});
