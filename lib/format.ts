import { DEMO_PREFIX, TRM } from "./config";
import { barrioById } from "./barrios";
import type { Lang } from "./i18n";
import type { Property } from "./properties";

const locale = (lang: Lang) => (lang === "es" ? "es-CO" : "en-US");

export function formatCOP(value: number, lang: Lang) {
  const n = new Intl.NumberFormat(locale(lang), { maximumFractionDigits: 0 }).format(Math.round(value));
  return lang === "es" ? `$${n}` : `COP ${n}`;
}

/** Abreviado para listados: $1.850 M / COP 1,850M */
export function formatCOPShort(value: number, lang: Lang) {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    const n = new Intl.NumberFormat(locale(lang), { maximumFractionDigits: millions < 10 ? 1 : 0 }).format(millions);
    return lang === "es" ? `$${n} M` : `COP ${n}M`;
  }
  return formatCOP(value, lang);
}

export function toUSD(cop: number) {
  return cop / TRM;
}

export function formatUSD(cop: number, lang: Lang) {
  const usd = toUSD(cop);
  // Redondeo amable: a cientos en montos pequeños, a miles en grandes.
  const rounded = usd >= 100_000 ? Math.round(usd / 1000) * 1000 : Math.round(usd / 10) * 10;
  const n = new Intl.NumberFormat(locale(lang), { maximumFractionDigits: 0 }).format(rounded);
  return `≈ US$${n}`;
}

export function formatNumber(value: number, lang: Lang) {
  return new Intl.NumberFormat(locale(lang), { maximumFractionDigits: 0 }).format(value);
}

/** Mensaje de "Me interesa": siempre en español porque lo recibe David. */
export function interestMessage(p: Property) {
  const title = p.title.es;
  const price = `${formatCOP(p.price, "es")} COP${p.operation === "arriendo" ? " al mes" : ""}`;
  return `${DEMO_PREFIX} me interesa el inmueble ${p.code} – ${title} – ${price} (${barrioById(p.barrio).name}, ${
    p.operation === "venta" ? "venta" : "arriendo"
  }).`;
}
