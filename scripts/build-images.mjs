// Descarga las fotos de referencia (Wikimedia Commons, licencias libres) y genera
// variantes webp optimizadas en public/img. Escribe los créditos en data/credits.json.
// Uso: node scripts/build-images.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const photos = JSON.parse(fs.readFileSync(path.join(root, 'scripts/photos.json'), 'utf8'));
const cache = path.join(root, '.cache/photos');
const outDir = path.join(root, 'public/img');
const WIDTHS = [480, 800, 1200, 1800];
const UA = 'AltamiraDemo/1.0 (portfolio demo site build script)';
fs.mkdirSync(cache, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

const strip = (s = '') => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const ids = Object.values(photos);
const api = `https://commons.wikimedia.org/w/api.php?action=query&pageids=${ids.join('|')}&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=2000&format=json`;
const { query } = await (await fetch(api, { headers: { 'User-Agent': UA } })).json();

const credits = {};
for (const [slug, id] of Object.entries(photos)) {
  const ii = query.pages[id].imageinfo[0];
  const m = ii.extmetadata;
  const raw = path.join(cache, `${slug}.jpg`);
  if (!fs.existsSync(raw)) {
    const res = await fetch(ii.thumburl || ii.url, { headers: { 'User-Agent': UA } });
    fs.writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
  }
  const meta = await sharp(raw).metadata();
  for (const w of WIDTHS) {
    const file = path.join(outDir, `${slug}-${w}.webp`);
    if (fs.existsSync(file)) continue;
    await sharp(raw).rotate().resize({ width: Math.min(w, meta.width) }).webp({ quality: 72 }).toFile(file);
  }
  credits[slug] = {
    title: query.pages[id].title.replace(/^File:/, '').replace(/\.[a-z]+$/i, ''),
    author: strip(m.Artist?.value),
    license: strip(m.LicenseShortName?.value),
    licenseUrl: m.LicenseUrl?.value ?? null,
    source: ii.descriptionurl,
    ratio: +(meta.width / meta.height).toFixed(3),
  };
  console.log('ok', slug);
}
fs.writeFileSync(path.join(root, 'data/credits.json'), JSON.stringify(credits, null, 2) + '\n');
