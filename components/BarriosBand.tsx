"use client";

import Image from "next/image";
import { BARRIOS, type BarrioId } from "@/lib/barrios";
import { photoSrc } from "@/lib/photos";
import { PROPERTIES } from "@/lib/properties";
import { t, type Lang } from "@/lib/i18n";
import { BARRIO_EVENT } from "./PropertySearch";

const GROW = [5, 2, 3, 2, 3, 2];

export function BarriosBand({ lang }: { lang: Lang }) {
  const d = t(lang).barrios;

  const pick = (e: React.MouseEvent<HTMLAnchorElement>, id: BarrioId) => {
    // Filtra el buscador sin recargar; el href queda como respaldo sin JavaScript.
    e.preventDefault();
    window.dispatchEvent(new CustomEvent(BARRIO_EVENT, { detail: id }));
    document.getElementById("inmuebles")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    history.replaceState(null, "", `?barrio=${id}#inmuebles`);
  };

  return (
    <section id="barrios" className="section" aria-labelledby="barrios-title">
      <div className="barrios__head" data-reveal>
        <h2 id="barrios-title" className="h-section">
          {d.heading}
        </h2>
      </div>
      <div className="band">
        {BARRIOS.map((b, i) => {
          const count = PROPERTIES.filter((p) => p.barrio === b.id).length;
          return (
            <a
              key={b.id}
              href={`?barrio=${b.id}#inmuebles`}
              className="band__panel"
              style={{ "--grow": GROW[i] } as React.CSSProperties}
              onClick={(e) => pick(e, b.id)}
            >
              <Image src={photoSrc(b.photo)} alt={b.photoAlt[lang]} fill sizes="(max-width: 800px) 62vw, 40vw" />
              <span className="band__label">
                <span className="band__name">{b.name}</span>
                <span className="band__count">{d.see(count)}</span>
                <span className="band__blurb">{b.blurb[lang]}</span>
              </span>
            </a>
          );
        })}
      </div>
      <p className="barrios__caption small">{d.caption}</p>
    </section>
  );
}
