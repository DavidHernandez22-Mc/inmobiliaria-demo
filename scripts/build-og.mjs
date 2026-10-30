// Genera public/og.jpg (1200×630) y public/apple-touch-icon.png.
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const photo = await sharp(path.join(root, ".cache/photos/cerros.jpg")).resize(1200, 630, { fit: "cover", position: "centre" }).toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect x="0" y="0" width="1200" height="630" fill="#0a0a0a" fill-opacity="0.38"/>
  <text x="60" y="470" font-family="Georgia, serif" font-size="150" font-weight="600" letter-spacing="-6" fill="#f3f1ec">Altamira</text>
  <text x="66" y="540" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#f3f1ec">Propiedades · Venta y arriendo en el norte de Bogotá</text>
  <text x="66" y="586" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#dedad3">Sitio de demostración</text>
</svg>`;
await sharp(photo).composite([{ input: Buffer.from(svg) }]).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(root, "public/og.jpg"));
await sharp(path.join(root, "public/favicon.svg")).resize(180, 180).png().toFile(path.join(root, "public/apple-touch-icon.png"));
console.log("og ok");
