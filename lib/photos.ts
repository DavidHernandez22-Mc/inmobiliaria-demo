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
  "hero-bogota": {
    es: "Panorámica luminosa de Bogotá con los cerros orientales y cielo azul",
    en: "Bright panorama of Bogotá with the eastern hills under a blue sky",
  },
  usaquen: { es: "Panorámica de Usaquén", en: "Panorama of Usaquén" },
  chico: { es: "Edificio de ladrillo en El Chicó", en: "Brick building in El Chicó" },
  chapinero: { es: "Edificio de ladrillo en Chapinero", en: "Brick building in Chapinero" },
  salitre: { es: "Edificio en Ciudad Salitre", en: "Apartment building in Ciudad Salitre" },
  cedritos: { es: "Calle del barrio Cedritos", en: "Street in Cedritos" },
  rosales: { es: "Parque Rosales junto a la Circunvalar", en: "Parque Rosales by the Circunvalar" },
  "sala-gris": { es: "Sala con sofá gris en L y mesa de centro", en: "Living room with grey corner sofa and coffee table" },
  "sala-2": { es: "Sala y cocina abierta con ventanal hacia la terraza", en: "Living room and open kitchen with sliding doors to the terrace" },
  "sala-5": { es: "Sala luminosa con piso de madera en espina de pez", en: "Bright living room with herringbone wood floor" },
  "cocina-2": { es: "Sala con cocina abierta en madera y piedra", en: "Living room with open kitchen in wood and stone" },
  "cocina-isla": { es: "Cocina con isla y lámparas colgantes", en: "Kitchen with island and pendant lights" },
  "cocina-4": { es: "Cocina en L completamente blanca", en: "All-white L-shaped kitchen" },
  "cocina-5": { es: "Cocina blanca con luz natural", en: "White kitchen with natural light" },
  "cocina-1": { es: "Cocina blanca con barra", en: "White kitchen with breakfast bar" },
  "comedor-cocina": { es: "Cocina blanca y comedor en un espacio luminoso", en: "White kitchen and dining area in a bright space" },
  "comedor-gris": { es: "Cocina abierta y comedor amplio con luz natural", en: "Open kitchen and large dining area with natural light" },
  "comedor-madera": { es: "Comedor con mesa de madera y sillas tapizadas", en: "Dining area with wooden table and upholstered chairs" },
  "alcoba-lujo": { es: "Alcoba principal con cabecero tapizado y tonos neutros", en: "Main bedroom with upholstered headboard in neutral tones" },
  "alcoba-hotel": { es: "Alcoba amoblada con cama doble y escritorio", en: "Furnished bedroom with double bed and desk" },
  "alcoba-clara": { es: "Alcoba clara con cama doble", en: "Bright bedroom with double bed" },
  "alcoba-moderna": { es: "Alcoba moderna con cabecero de diseño", en: "Modern bedroom with designer headboard" },
  "alcoba-3": { es: "Alcoba con ventanal y ropa de cama blanca", en: "Bedroom with large window and white bedding" },
  "bano-1": { es: "Baño con ducha en vidrio y doble lavamanos", en: "Bathroom with glass shower and double basin" },
  "bano-2": { es: "Baño con madera y vidrio", en: "Bathroom in wood and glass" },
  "bano-3": { es: "Baño con enchape de madera y ducha en vidrio", en: "Bathroom with wood panelling and glass shower" },
  "estudio-1": { es: "Apartaestudio luminoso con plantas y ventanal", en: "Bright studio with plants and a large window" },
  "casa-1": { es: "Casa con sala abierta hacia el patio", en: "House with living room opening onto the patio" },
};

export const photoAlt = (slug: string, lang: Lang) => PHOTO_ALT[slug]?.[lang] ?? "";
