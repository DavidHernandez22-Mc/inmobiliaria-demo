// Configuración central de la demo.
// Cambia WHATSAPP_NUMBER por tu número en formato internacional, solo dígitos (ej. 573001234567).
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "TU_NUMERO";

export const SITE_URL = "https://inmobiliariademo1.netlify.app";
export const SITE_NAME = "Altamira Propiedades";
export const DEMO_AUTHOR = "David";

// TRM de referencia para mostrar precios aproximados en USD.
export const TRM = 4000;
export const TRM_LABEL = { es: "TRM de referencia: $4.000 COP por 1 USD", en: "Reference exchange rate: COP 4,000 per USD 1" };

export const GENERAL_MESSAGE = "Hola David, vi tu demo de la inmobiliaria y me interesa una web así para mi negocio.";
export const DEMO_PREFIX = "Hola David, probé tu demo de la inmobiliaria:";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
