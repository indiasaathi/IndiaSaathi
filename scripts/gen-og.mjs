// Generates public/og.png (1200x630), public/favicon.ico and public/apple-touch-icon.png
// from hand-written SVG source. Run with: npm run gen:og
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const NAVY = '#0d2b45';
const GOLD = '#c8a55a';
const GOLD_LIGHT = '#e0c07a';

function ogSvg() {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${NAVY}"/>
    <circle cx="1120" cy="60" r="180" fill="none" stroke="${GOLD}" stroke-opacity="0.15" stroke-width="40"/>
    <circle cx="1020" cy="560" r="100" fill="none" stroke="${GOLD}" stroke-opacity="0.1" stroke-width="22"/>
    <rect x="90" y="90" width="220" height="3" fill="${GOLD}"/>
    <text x="90" y="240" font-family="Georgia, 'Playfair Display', serif" font-size="72" font-weight="700" fill="#ffffff">INDIA SAATHI</text>
    <text x="90" y="290" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="${GOLD}">YOUR TRUSTED COMPANION IN INDIA</text>
    <text x="90" y="360" font-family="Georgia, 'Playfair Display', serif" font-size="34" font-weight="600" fill="#ffffff">End-to-End Asset, Property &amp; Financial</text>
    <text x="90" y="405" font-family="Georgia, 'Playfair Display', serif" font-size="34" font-weight="600" fill="#ffffff">Services for NRIs — From Anywhere</text>
    <rect x="90" y="460" width="260" height="3" fill="${GOLD}"/>
    <text x="90" y="510" font-family="Arial, sans-serif" font-size="20" fill="${GOLD_LIGHT}">Mumbai, Maharashtra · NRI India Desk</text>
  </svg>`;
}

function faviconSvg(size) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="12" fill="${NAVY}"/>
    <text x="32" y="41" font-family="Georgia, 'Playfair Display', serif" font-size="26" font-weight="700" fill="${GOLD}" text-anchor="middle">IS</text>
  </svg>`;
}

async function renderPng(svg, width, height) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    background: 'rgba(0,0,0,0)',
  });
  const rendered = resvg.render();
  return rendered.asPng();
}

async function main() {
  const ogPng = await renderPng(ogSvg(), 1200, 630);
  writeFileSync(path.join(publicDir, 'og.png'), ogPng);
  console.log('✓ og.png');

  const icon32 = await renderPng(faviconSvg(32), 32, 32);
  await sharp(icon32).toFormat('png').toFile(path.join(publicDir, 'favicon-32.png'));
  // sharp can't write true multi-size .ico; use the 32px PNG as favicon.ico payload via sharp's ico support fallback
  await sharp(icon32).resize(32, 32).toFile(path.join(publicDir, 'favicon.ico'));
  console.log('✓ favicon.ico');

  const icon180 = await renderPng(faviconSvg(180), 180, 180);
  await sharp(icon180).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
