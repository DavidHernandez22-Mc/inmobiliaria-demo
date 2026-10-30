import credits from "@/data/credits.json";
import type { Lang } from "./i18n";

export type PhotoSlug = keyof typeof credits;

export interface Credit {
  title: string;
  author: string;
  license: string;
  licenseUrl: string | null;
  source: string;
  ratio: number;
}

export const CREDITS = credits as Record<PhotoSlug, Credit>;

export const photoSrc = (slug: string) => `/img/${slug}`;

// Texto alternativo de cada foto de referencia.
export const PHOTO_ALT: Record<string, Record<Lang, string>> = {
  cerros: {
    es: "Los cerros orientales de Bogotá sobre edificios de ladrillo, vistos desde La Castellana",
    en: "Bogotá's eastern hills above red-brick buildings, seen from La Castellana",
  },
  usaquen: { es: "Panorámica de Usaquén", en: "Panorama of Usaquén" },
  chico: { es: "Edificio de ladrillo en El Chicó", en: "Brick building in El Chicó" },
  parque93: { es: "Parque de la 93 en El Chicó", en: "Parque de la 93 in El Chicó" },
  chapinero: { es: "Edificio de ladrillo en Chapinero", en: "Brick building in Chapinero" },
  salitre: { es: "Edificio en Ciudad Salitre", en: "Apartment building in Ciudad Salitre" },
  cedritos: { es: "Calle del barrio Cedritos", en: "Street in Cedritos" },
  rosales: { es: "Parque Rosales junto a la Circunvalar", en: "Parque Rosales by the Circunvalar" },
  "chico-norte": { es: "Edificio residencial blanco en El Chicó", en: "White residential building in El Chicó" },
  "sala-1": { es: "Sala amplia con sofás claros y ventanales", en: "Spacious living room with pale sofas and large windows" },
  "sala-2": { es: "Sala y cocina abierta con ventanal hacia la terraza", en: "Living room and open kitchen with sliding doors to the terrace" },
  "comedor-1": { es: "Comedor junto a la sala con biblioteca", en: "Dining area next to the living room and bookshelves" },
  "cocina-1": { es: "Cocina blanca con barra y nevera", en: "White kitchen with breakfast bar" },
  "alcoba-1": { es: "Alcoba principal con cama doble y mesas de noche", en: "Main bedroom with double bed and bedside tables" },
  "alcoba-2": { es: "Alcoba con ventana hacia los árboles", en: "Bedroom with a window onto trees" },
  "bano-1": { es: "Baño con ducha en vidrio y doble lavamanos", en: "Bathroom with glass shower and double basin" },
  "sala-3": { es: "Sala cálida con sofá de gamuza y balcón", en: "Warm living room with suede sofa and balcony" },
  "cocina-2": { es: "Cocina moderna con madera y mesón de piedra", en: "Modern kitchen in wood and stone" },
  "cocina-3": { es: "Cocina con gabinetes de madera e iluminación bajo mueble", en: "Kitchen with wooden cabinets and under-cabinet lighting" },
  "cocina-4": { es: "Cocina en L completamente blanca", en: "All-white L-shaped kitchen" },
  "casa-1": { es: "Casa con sala abierta hacia el patio", en: "House with living room opening onto the patio" },
  "sala-4": { es: "Sala con ventanales de piso a techo y vista verde", en: "Living room with floor-to-ceiling windows and green views" },
  "cocina-5": { es: "Cocina blanca con luz natural", en: "White kitchen with natural light" },
  "bano-2": { es: "Baño con madera y vidrio", en: "Bathroom in wood and glass" },
  "bano-3": { es: "Baño con enchape de madera y ducha en vidrio", en: "Bathroom with wood panelling and glass shower" },
  "sala-5": { es: "Sala luminosa con piso de madera en espina de pez", en: "Bright living room with herringbone wood floor" },
  "alcoba-3": { es: "Alcoba con ventanal y ropa de cama blanca", en: "Bedroom with large window and white bedding" },
  "sala-6": { es: "Sala vacía lista para amoblar", en: "Empty living room ready to furnish" },
};

export const photoAlt = (slug: string, lang: Lang) => PHOTO_ALT[slug]?.[lang] ?? "";
