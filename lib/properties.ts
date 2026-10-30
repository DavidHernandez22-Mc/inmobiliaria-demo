import type { BarrioId } from "./barrios";
import type { Lang } from "./i18n";

export type Operation = "venta" | "arriendo";
export type PropertyType = "apartamento" | "casa" | "penthouse" | "apartaestudio";

export interface Property {
  code: string;
  operation: Operation;
  type: PropertyType;
  barrio: BarrioId;
  /** COP. En arriendo, canon mensual. */
  price: number;
  /** Área construida en m². */
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  stratum: number;
  /** Piso dentro del edificio; en casas, número de niveles. */
  floor: number;
  /** Años de construido. */
  age: number;
  /** Administración mensual en COP (0 si no aplica). */
  admin: number;
  furnished?: boolean;
  photos: string[];
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  features: Record<Lang, string[]>;
}

// Inmuebles ficticios con valores de referencia de Bogotá 2026.
export const PROPERTIES: Property[] = [
  {
    code: "ALT-1024",
    operation: "venta",
    type: "apartamento",
    barrio: "chico",
    price: 1_850_000_000,
    area: 168,
    bedrooms: 3,
    bathrooms: 4,
    parking: 2,
    stratum: 6,
    floor: 5,
    age: 12,
    admin: 1_480_000,
    photos: ["sala-vista", "cocina-isla", "alcoba-lujo", "bano-1", "comedor-madera"],
    title: { es: "Apartamento con terraza en el Chicó", en: "Terrace apartment in El Chicó" },
    description: {
      es: "A dos cuadras del Parque de la 93. Sala comedor con chimenea que abre a una terraza de 24 m², estudio independiente y alcoba principal con vestier y baño completo. Edificio de ladrillo de cinco pisos con portería 24 horas y gimnasio.",
      en: "Two blocks from Parque de la 93. Living and dining room with a fireplace opening onto a 24 m² terrace, a separate study and a main bedroom with walk-in closet and en-suite. Five-storey brick building with 24-hour doorman and gym.",
    },
    features: {
      es: ["Terraza de 24 m²", "Chimenea", "Estudio", "Vestier", "Depósito", "Gimnasio", "Portería 24 h"],
      en: ["24 m² terrace", "Fireplace", "Study", "Walk-in closet", "Storage room", "Gym", "24-hour doorman"],
    },
  },
  {
    code: "ALT-1031",
    operation: "venta",
    type: "penthouse",
    barrio: "rosales",
    price: 3_950_000_000,
    area: 312,
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    stratum: 6,
    floor: 9,
    age: 18,
    admin: 3_200_000,
    photos: ["sala-4", "cocina-2", "alcoba-moderna", "bano-2", "comedor-cocina"],
    title: { es: "Penthouse con vista a los cerros", en: "Penthouse facing the hills" },
    description: {
      es: "Último piso en dos niveles con ventanales de piso a techo hacia los cerros orientales y la ciudad. Cocina abierta con isla, salón de estar familiar, cuatro alcobas con baño propio y terraza privada en el segundo nivel.",
      en: "Two-level top floor with floor-to-ceiling windows facing the eastern hills and the city. Open kitchen with island, family room, four bedrooms each with its own bathroom and a private terrace on the upper level.",
    },
    features: {
      es: ["Dos niveles", "Terraza privada", "Vista a los cerros", "Cocina con isla", "Ascensor privado", "Planta eléctrica", "Tres parqueaderos"],
      en: ["Two levels", "Private terrace", "Hill views", "Kitchen island", "Private lift", "Backup generator", "Three parking spaces"],
    },
  },
  {
    code: "ALT-1047",
    operation: "venta",
    type: "casa",
    barrio: "usaquen",
    price: 2_700_000_000,
    area: 340,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    stratum: 5,
    floor: 3,
    age: 25,
    admin: 950_000,
    photos: ["casa-1", "sala-gris", "cocina-5", "alcoba-clara", "bano-3"],
    title: { es: "Casa en conjunto cerrado, Usaquén", en: "Gated townhouse in Usaquén" },
    description: {
      es: "Casa de tres niveles en conjunto de doce casas con vigilancia. Jardín privado, sala con doble altura, cocina abierta al comedor y alcoba principal con balcón. A diez minutos a pie de la plaza de Usaquén.",
      en: "Three-level house in a guarded community of twelve homes. Private garden, double-height living room, kitchen open to the dining room and a main bedroom with balcony. A ten-minute walk from Usaquén square.",
    },
    features: {
      es: ["Jardín privado", "Doble altura", "Estudio", "Cuarto de servicio", "Zona de ropas", "Conjunto con vigilancia"],
      en: ["Private garden", "Double-height ceiling", "Study", "Staff room", "Laundry room", "Guarded community"],
    },
  },
  {
    code: "ALT-1052",
    operation: "venta",
    type: "apartamento",
    barrio: "cedritos",
    price: 585_000_000,
    area: 86,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    stratum: 4,
    floor: 7,
    age: 8,
    admin: 420_000,
    photos: ["sala-gris", "cocina-4", "alcoba-clara", "bano-1"],
    title: { es: "Apartamento familiar en Cedritos", en: "Family apartment in Cedritos" },
    description: {
      es: "Tres alcobas en 86 m² bien distribuidos, cocina integral cerrada y balcón hacia el occidente. Conjunto con parque infantil, salón comunal y piscina cubierta, cerca de colegios y de la avenida 19.",
      en: "Three bedrooms in a well-planned 86 m², closed fitted kitchen and a west-facing balcony. The complex has a playground, residents' lounge and indoor pool, close to schools and Avenida 19.",
    },
    features: {
      es: ["Balcón", "Piscina cubierta", "Parque infantil", "Salón comunal", "Depósito"],
      en: ["Balcony", "Indoor pool", "Playground", "Residents' lounge", "Storage room"],
    },
  },
  {
    code: "ALT-1068",
    operation: "venta",
    type: "apartamento",
    barrio: "chapinero-alto",
    price: 890_000_000,
    area: 98,
    bedrooms: 2,
    bathrooms: 2,
    parking: 2,
    stratum: 6,
    floor: 11,
    age: 3,
    admin: 780_000,
    photos: ["cocina-2", "sala-vista", "alcoba-lujo", "bano-2"],
    title: { es: "Apartamento nuevo en Chapinero Alto", en: "New apartment in Chapinero Alto" },
    description: {
      es: "Edificio de 2023 en ladera, piso once con vista abierta a la sabana. Cocina abierta, dos alcobas con baño y balcón corrido. Terraza comunal con BBQ, coworking y gimnasio. A pasos de la Zona G.",
      en: "Built in 2023 on the hillside, eleventh floor with open views over the savannah. Open kitchen, two en-suite bedrooms and a full-width balcony. Rooftop with barbecue, coworking room and gym. Steps from Zona G.",
    },
    features: {
      es: ["Balcón corrido", "Vista a la sabana", "Coworking", "Terraza BBQ", "Gimnasio", "Dos parqueaderos"],
      en: ["Full-width balcony", "Savannah views", "Coworking room", "Rooftop barbecue", "Gym", "Two parking spaces"],
    },
  },
  {
    code: "ALT-1073",
    operation: "venta",
    type: "apartamento",
    barrio: "salitre",
    price: 520_000_000,
    area: 92,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    stratum: 4,
    floor: 4,
    age: 15,
    admin: 390_000,
    photos: ["sala-5", "cocina-1", "alcoba-3", "bano-3"],
    title: { es: "Apartamento junto al parque, Salitre", en: "Apartment by the park, Salitre" },
    description: {
      es: "Conjunto cerrado frente a zona verde, a cinco minutos del parque Simón Bolívar y quince del aeropuerto. Sala comedor con buena luz, tres alcobas y cocina con zona de ropas independiente.",
      en: "Gated complex facing a green area, five minutes from Simón Bolívar park and fifteen from the airport. Bright living and dining room, three bedrooms and a kitchen with separate laundry area.",
    },
    features: {
      es: ["Frente a zona verde", "Cancha múltiple", "Salón comunal", "Zona de ropas", "Cerca al aeropuerto"],
      en: ["Faces a green area", "Sports court", "Residents' lounge", "Laundry area", "Near the airport"],
    },
  },
  {
    code: "ALT-1085",
    operation: "venta",
    type: "apartamento",
    barrio: "usaquen",
    price: 1_120_000_000,
    area: 132,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    stratum: 5,
    floor: 3,
    age: 6,
    admin: 890_000,
    photos: ["sala-2", "comedor-madera", "cocina-isla", "alcoba-moderna", "bano-2"],
    title: { es: "Apartamento con balcón en Usaquén", en: "Apartment with balcony in Usaquén" },
    description: {
      es: "Tercer piso en edificio boutique de seis apartamentos. Balcón hacia un jardín interior, sala con piso de madera, cocina abierta con mesón en cuarzo y alcoba principal con vestier.",
      en: "Third floor in a boutique building of six apartments. Balcony over an inner garden, wood-floored living room, open kitchen with quartz worktops and main bedroom with walk-in closet.",
    },
    features: {
      es: ["Balcón", "Edificio boutique", "Piso en madera", "Mesones en cuarzo", "Vestier", "Depósito"],
      en: ["Balcony", "Boutique building", "Wood floors", "Quartz worktops", "Walk-in closet", "Storage room"],
    },
  },
  {
    code: "ALT-1090",
    operation: "venta",
    type: "apartaestudio",
    barrio: "chico",
    price: 460_000_000,
    area: 48,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    stratum: 6,
    floor: 8,
    age: 4,
    admin: 410_000,
    furnished: true,
    photos: ["estudio-1", "cocina-1", "alcoba-hotel", "bano-1"],
    title: { es: "Apartaestudio para inversión, Chicó", en: "Investment studio in El Chicó" },
    description: {
      es: "Entregado amoblado y con historial de arriendo a ejecutivos. Planta abierta con cocina integral, alcoba separada por puerta corrediza y baño con ducha en vidrio. Ideal para inversionistas desde el exterior.",
      en: "Sold furnished with a track record of rentals to executives. Open plan with fitted kitchen, a bedroom behind a sliding door and a bathroom with glass shower. A good fit for investors abroad.",
    },
    features: {
      es: ["Amoblado", "Historial de arriendo", "Coworking", "Lavandería comunal", "Portería 24 h"],
      en: ["Furnished", "Rental track record", "Coworking room", "Shared laundry", "24-hour doorman"],
    },
  },
  {
    code: "ALT-2014",
    operation: "arriendo",
    type: "apartamento",
    barrio: "rosales",
    price: 14_500_000,
    area: 220,
    bedrooms: 3,
    bathrooms: 4,
    parking: 3,
    stratum: 6,
    floor: 6,
    age: 20,
    admin: 2_300_000,
    photos: ["comedor-madera", "sala-4", "cocina-isla", "alcoba-lujo", "bano-3"],
    title: { es: "Apartamento amplio en Rosales", en: "Spacious apartment in Rosales" },
    description: {
      es: "220 m² en un piso por planta: ascensor que llega directo al apartamento, sala y comedor separados, estudio con biblioteca y tres alcobas con baño. Calle cerrada y arborizada cerca de la Circunvalar.",
      en: "220 m² taking a whole floor: the lift opens straight into the apartment, separate living and dining rooms, a study with built-in shelves and three en-suite bedrooms. Quiet, tree-lined street near the Circunvalar.",
    },
    features: {
      es: ["Un apartamento por piso", "Ascensor directo", "Estudio", "Chimenea", "Cuarto de servicio", "Tres parqueaderos"],
      en: ["Whole-floor apartment", "Direct lift access", "Study", "Fireplace", "Staff room", "Three parking spaces"],
    },
  },
  {
    code: "ALT-2027",
    operation: "arriendo",
    type: "apartamento",
    barrio: "chico",
    price: 8_200_000,
    area: 110,
    bedrooms: 2,
    bathrooms: 2,
    parking: 2,
    stratum: 6,
    floor: 10,
    age: 5,
    admin: 1_050_000,
    furnished: true,
    photos: ["alcoba-hotel", "sala-gris", "comedor-cocina", "bano-2"],
    title: { es: "Amoblado para ejecutivos, Chicó", en: "Furnished executive flat, El Chicó" },
    description: {
      es: "Totalmente amoblado y equipado: menaje, ropa de cama e internet de fibra. Piso diez con balcón, dos alcobas con baño y estudio. Contratos desde seis meses para empresas y expatriados.",
      en: "Fully furnished and equipped: kitchenware, bed linen and fibre internet. Tenth floor with balcony, two en-suite bedrooms and a study. Leases from six months for companies and expats.",
    },
    features: {
      es: ["Amoblado y equipado", "Internet de fibra", "Balcón", "Estudio", "Gimnasio", "Contrato desde 6 meses"],
      en: ["Furnished and equipped", "Fibre internet", "Balcony", "Study", "Gym", "Leases from 6 months"],
    },
  },
  {
    code: "ALT-2033",
    operation: "arriendo",
    type: "apartamento",
    barrio: "cedritos",
    price: 3_100_000,
    area: 72,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    stratum: 4,
    floor: 5,
    age: 10,
    admin: 340_000,
    photos: ["comedor-cocina", "sala-5", "alcoba-clara", "bano-1"],
    title: { es: "Apartamento de dos alcobas, Cedritos", en: "Two-bedroom flat in Cedritos" },
    description: {
      es: "Quinto piso exterior con balcón, cocina abierta y dos alcobas con baño. Conjunto con gimnasio y parque infantil, a una cuadra de la calle 140 y de rutas de transporte público.",
      en: "Fifth-floor, street-facing flat with balcony, open kitchen and two bedrooms with their own bathrooms. Complex with gym and playground, one block from Calle 140 and public transport.",
    },
    features: {
      es: ["Balcón", "Exterior", "Gimnasio", "Parque infantil", "Cerca a transporte"],
      en: ["Balcony", "Street-facing", "Gym", "Playground", "Near public transport"],
    },
  },
  {
    code: "ALT-2041",
    operation: "arriendo",
    type: "apartamento",
    barrio: "chapinero-alto",
    price: 5_600_000,
    area: 85,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    stratum: 5,
    floor: 8,
    age: 7,
    admin: 620_000,
    photos: ["cocina-isla", "sala-vista", "alcoba-moderna", "bano-2"],
    title: { es: "Apartamento con vista, Chapinero Alto", en: "Apartment with a view, Chapinero Alto" },
    description: {
      es: "Ventanales hacia la ciudad desde la sala y la alcoba principal. Cocina en madera con barra, segunda alcoba que funciona como estudio y terraza comunal. Cerca de universidades y de la carrera Séptima.",
      en: "City views from the living room and main bedroom. Wooden kitchen with breakfast bar, a second bedroom that works as a study and a shared rooftop. Close to universities and Carrera Séptima.",
    },
    features: {
      es: ["Vista a la ciudad", "Terraza comunal", "Cocina con barra", "Estudio", "Bicicletero"],
      en: ["City views", "Shared rooftop", "Breakfast bar", "Study", "Bike storage"],
    },
  },
  {
    code: "ALT-2056",
    operation: "arriendo",
    type: "casa",
    barrio: "usaquen",
    price: 12_000_000,
    area: 280,
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    stratum: 5,
    floor: 2,
    age: 30,
    admin: 0,
    photos: ["casa-2", "casa-1", "sala-2", "cocina-5", "alcoba-3", "bano-3"],
    title: { es: "Casa con jardín en Usaquén", en: "House with garden in Usaquén" },
    description: {
      es: "Casa independiente de dos niveles en calle residencial, con jardín al frente y patio trasero. Sala con chimenea, comedor para ocho personas, cuatro alcobas y estudio. Admite mascotas.",
      en: "Detached two-storey house on a residential street with a front garden and back patio. Living room with fireplace, dining room for eight, four bedrooms and a study. Pets welcome.",
    },
    features: {
      es: ["Jardín y patio", "Chimenea", "Estudio", "Admite mascotas", "Cuarto de servicio"],
      en: ["Garden and patio", "Fireplace", "Study", "Pets welcome", "Staff room"],
    },
  },
  {
    code: "ALT-2062",
    operation: "arriendo",
    type: "apartamento",
    barrio: "salitre",
    price: 2_900_000,
    area: 78,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    stratum: 4,
    floor: 9,
    age: 14,
    admin: 310_000,
    photos: ["cocina-5", "sala-5", "alcoba-3", "bano-1"],
    title: { es: "Apartamento cerca a El Dorado, Salitre", en: "Flat near El Dorado airport, Salitre" },
    description: {
      es: "Piso nueve con buena luz, tres alcobas y cocina abierta. A quince minutos del aeropuerto, junto a centros comerciales y a la avenida La Esperanza. Conjunto con piscina y vigilancia.",
      en: "Bright ninth-floor flat with three bedrooms and an open kitchen. Fifteen minutes from the airport, next to shopping centres and Avenida La Esperanza. Complex with pool and security.",
    },
    features: {
      es: ["Piscina", "Vigilancia 24 h", "Cocina abierta", "Cerca al aeropuerto", "Centros comerciales"],
      en: ["Pool", "24-hour security", "Open kitchen", "Near the airport", "Shopping nearby"],
    },
  },
];

export const propertyByCode = (code: string) => PROPERTIES.find((p) => p.code === code);

export const PRICE_STEPS: Record<Operation, number[]> = {
  venta: [400_000_000, 600_000_000, 900_000_000, 1_200_000_000, 2_000_000_000, 3_000_000_000, 4_000_000_000],
  arriendo: [2_500_000, 3_500_000, 5_000_000, 8_000_000, 10_000_000, 15_000_000],
};
