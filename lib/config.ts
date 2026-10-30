// Configuración central de la demo.
// Número de WhatsApp en formato internacional, solo dígitos. Se puede sobrescribir con NEXT_PUBLIC_WHATSAPP_NUMBER.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573008564773";

export const SITE_URL = "https://inmobiliaria1david.netlify.app";
export const SITE_NAME = "Altamira Propiedades";
export const DEMO_AUTHOR = "David";

// TRM de referencia para mostrar precios aproximados en USD.
export const TRM = 3160;
export const TRM_LABEL = { es: "TRM de referencia: $3.160 COP por 1 USD", en: "Reference exchange rate: COP 3,160 per USD 1" };

export const GENERAL_MESSAGE = "Hola David, vi tu demo de la inmobiliaria y me interesa una web así para mi negocio.";
export const DEMO_PREFIX = "Hola David, probé tu demo de la inmobiliaria:";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
