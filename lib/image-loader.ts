// Las fotos se pre-generan en public/img/<slug>-<ancho>.webp (scripts/build-images.mjs).
// next/image pide un ancho y aquí se elige la variante generada más cercana por arriba.
const WIDTHS = [480, 800, 1200, 1800];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const w = WIDTHS.find((candidate) => candidate >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${src}-${w}.webp`;
}
