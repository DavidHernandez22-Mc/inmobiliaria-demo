export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Datos estructurados generados en el build a partir de datos propios.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
