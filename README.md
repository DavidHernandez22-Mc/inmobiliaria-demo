# Altamira Propiedades · demo de sitio inmobiliario

Sitio de demostración de una inmobiliaria ficticia en Bogotá (Chicó, Rosales, Usaquén, Cedritos, Chapinero Alto y Salitre), hecho para un portafolio de diseño web.

**URL:** https://inmobiliaria1david.netlify.app

## Qué incluye

- Buscador con filtros (venta/arriendo, barrio, precio, habitaciones, baños, parqueaderos, área) y orden por precio o área. Los resultados se actualizan al instante.
- 14 inmuebles ficticios con datos de referencia de Bogotá 2026 y una ficha por inmueble: galería, características, mapa de la zona (sin dirección exacta) y botón «Me interesa» que abre WhatsApp con el código, el título y el precio.
- Calculadora de crédito hipotecario (cuota inicial mínima del 30 %, plazo y tasa E.A. editable).
- Formulario de captación para propietarios que se envía por WhatsApp.
- Versión en inglés (`/en/`) con precios aproximados en USD.
- SEO: títulos, meta description, Open Graph, hreflang, sitemap, robots y datos estructurados (schema.org).

## Desarrollo

```bash
npm install
npm run dev
```

## Publicación en Netlify

- Build command: `npm run build`
- Publish directory: `out`

## Configuración

- **Número de WhatsApp:** `lib/config.ts` (573008564773). Se puede sobrescribir con la variable de entorno `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- **TRM de referencia:** `lib/config.ts`.
- **Inmuebles:** `lib/properties.ts`. **Barrios:** `lib/barrios.ts`. **Textos ES/EN:** `lib/i18n.ts`.

## Fotos

Fotos de referencia de Wikimedia Commons con licencias libres (CC0, CC BY, CC BY-SA). No muestran los inmuebles anunciados. Los créditos completos están en el pie de página del sitio y en `data/credits.json`.

Para volver a descargar las fotos y regenerar las versiones webp (480, 800, 1200 y 1800 px):

```bash
node scripts/build-images.mjs
node scripts/build-og.mjs
```

## Aviso

Marca, inmuebles, precios y testimonios son ficticios. No se ofrece ningún servicio real ni se afirma ningún registro, licencia o afiliación.

Tipografías: Erode y General Sans (Indian Type Foundry, vía Fontshare, ITF Free Font License).
