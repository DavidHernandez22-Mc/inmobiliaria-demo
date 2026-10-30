"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

// Solo se importa en el cliente (ver AreaMap). Muestra un área, nunca un punto exacto.
export default function LeafletMap({ center, label }: { center: [number, number]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled || !ref.current) return;
      map = L.map(ref.current, {
        center,
        zoom: 14,
        scrollWheelZoom: false,
        attributionControl: true,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      L.circle(center, {
        radius: 650,
        color: "#24584a",
        weight: 2,
        fillColor: "#24584a",
        fillOpacity: 0.18,
      })
        .addTo(map)
        .bindTooltip(label, { permanent: true, direction: "center", className: "map-label" });
    });
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [center, label]);

  return <div ref={ref} style={{ position: "absolute", inset: 0 }} />;
}
