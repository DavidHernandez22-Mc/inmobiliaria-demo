"use client";

import dynamic from "next/dynamic";

// Leaflet usa window: se carga solo en el navegador.
const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

export function AreaMap({ center, label, loadingText }: { center: [number, number]; label: string; loadingText: string }) {
  return (
    <div className="map" role="region" aria-label={label}>
      <p className="map__fallback small">{loadingText}</p>
      <LeafletMap center={center} label={label} />
    </div>
  );
}
