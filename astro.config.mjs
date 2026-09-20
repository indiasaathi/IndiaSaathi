import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://indiasaathi.com',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
