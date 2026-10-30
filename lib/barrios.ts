import type { Lang } from "./i18n";

export type BarrioId = "chico" | "rosales" | "usaquen" | "cedritos" | "chapinero-alto" | "salitre";

export interface Barrio {
  id: BarrioId;
  name: string;
  // Centro aproximado del barrio. El mapa muestra un área, nunca una dirección.
  center: [number, number];
  photo: string;
  photoAlt: Record<Lang, string>;
  blurb: Record<Lang, string>;
}

export const BARRIOS: Barrio[] = [
  {
    id: "chico",
    name: "Chicó",
    center: [4.6772, -74.0485],
    photo: "chico",
    photoAlt: {
      es: "Edificio residencial de ladrillo en la calle 93, barrio El Chicó",
      en: "Red-brick residential building on Calle 93, El Chicó",
    },
    blurb: {
      es: "Parque de la 93, restaurantes y oficinas a pie. Edificios de ladrillo con portería y calles arborizadas.",
      en: "Parque de la 93, restaurants and offices within walking distance. Brick buildings with 24-hour doormen and tree-lined streets.",
    },
  },
  {
    id: "rosales",
    name: "Rosales",
    center: [4.6565, -74.0515],
    photo: "rosales",
    photoAlt: {
      es: "Árboles del parque Rosales junto a la avenida Circunvalar",
      en: "Trees in Parque Rosales by Avenida Circunvalar",
    },
    blurb: {
      es: "Pegado a los cerros, silencioso y verde. Apartamentos grandes, muchos con vista a la ciudad.",
      en: "Tucked against the eastern hills, quiet and green. Large apartments, many with city views.",
    },
  },
  {
    id: "usaquen",
    name: "Usaquén",
    center: [4.6955, -74.0315],
    photo: "usaquen",
    photoAlt: {
      es: "Vista panorámica de Usaquén con los cerros orientales al fondo",
      en: "Panoramic view of Usaquén with the eastern hills behind",
    },
    blurb: {
      es: "Plaza fundacional, mercado de pulgas los domingos y casas en conjunto cerrado al pie de la montaña.",
      en: "Colonial-era square, a Sunday flea market and gated townhouses at the foot of the hills.",
    },
  },
  {
    id: "cedritos",
    name: "Cedritos",
    center: [4.7228, -74.0425],
    photo: "cedritos",
    photoAlt: { es: "Calle residencial del barrio Cedritos", en: "Residential street in Cedritos" },
    blurb: {
      es: "Familias jóvenes, colegios y comercio de barrio. La mejor relación precio por metro del norte.",
      en: "Young families, schools and neighbourhood shops. The best price per square metre in the north.",
    },
  },
  {
    id: "chapinero-alto",
    name: "Chapinero Alto",
    center: [4.6448, -74.0575],
    photo: "chapinero",
    photoAlt: { es: "Edificio de ladrillo en Chapinero, calle 69", en: "Brick building in Chapinero, Calle 69" },
    blurb: {
      es: "Cafés, universidades y la Zona G. Proyectos nuevos en ladera con vista a la sabana.",
      en: "Cafés, universities and the Zona G food district. New hillside buildings looking over the savannah.",
    },
  },
  {
    id: "salitre",
    name: "Salitre",
    center: [4.6515, -74.1035],
    photo: "salitre",
    photoAlt: { es: "Edificio de ladrillo en Ciudad Salitre", en: "Brick apartment building in Ciudad Salitre" },
    blurb: {
      es: "Planeado, plano y cerca del aeropuerto El Dorado y del parque Simón Bolívar.",
      en: "Planned and flat, close to El Dorado airport and Simón Bolívar park.",
    },
  },
];

export const barrioById = (id: BarrioId) => BARRIOS.find((b) => b.id === id)!;
