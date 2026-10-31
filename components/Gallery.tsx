"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { t, type Lang } from "@/lib/i18n";
import { photoAlt, photoSrc } from "@/lib/photos";
import { ArrowIcon, CloseIcon } from "./Icons";

export function Gallery({ photos, lang, title }: { photos: string[]; lang: Lang; title: string }) {
  const d = t(lang).property;
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const n = photos.length;

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const go = useCallback((delta: number) => setIndex((i) => (i === null ? i : (i + delta + n) % n)), [n]);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, go]);

  return (
    <>
      <div className="gallery" role="list" aria-label={d.gallery}>
        {photos.map((slug, i) => (
          <button
            key={slug + i}
            type="button"
            role="listitem"
            className="gallery__item"
            aria-label={`${d.open}: ${photoAlt(slug, lang)} (${d.photoOf(i + 1, n)})`}
            onClick={(e) => {
              lastTrigger.current = e.currentTarget;
              setIndex(i);
            }}
          >
            <Image
              src={photoSrc(slug)}
              alt=""
              fill
              priority={i === 0}
              sizes={i === 0 ? "(max-width: 700px) 88vw, 66vw" : "(max-width: 700px) 88vw, 33vw"}
            />
            {i === 2 && n > 3 && (
              <span className="gallery__more" aria-hidden="true">
                +{n - 3}
              </span>
            )}
          </button>
        ))}
      </div>

      {index !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${d.gallery}: ${title}`}>
          <div className="lightbox__top">
            <span className="lightbox__counter" aria-live="polite">
              <span className="sr-only">{d.photoOf(index + 1, n)}</span>
              <span aria-hidden="true">
                {index + 1} / {n}
              </span>
            </span>
            <button ref={closeRef} type="button" className="icon-btn" onClick={close} aria-label={d.close}>
              <CloseIcon />
            </button>
          </div>
          <div
            className="lightbox__stage"
            onTouchStart={(e) => {
              const t0 = e.touches[0];
              touchStart.current = { x: t0.clientX, y: t0.clientY };
            }}
            onTouchEnd={(e) => {
              const start = touchStart.current;
              touchStart.current = null;
              if (!start) return;
              const t1 = e.changedTouches[0];
              const dx = t1.clientX - start.x;
              const dy = t1.clientY - start.y;
              // Deslizar horizontal: siguiente o anterior. Deslizar hacia abajo: cerrar.
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
              else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
            }}
          >
            <button type="button" className="icon-btn lightbox__side lightbox__side--prev" onClick={() => go(-1)} aria-label={d.prev}>
              <ArrowIcon direction="left" />
            </button>
            <Image key={photos[index]} src={photoSrc(photos[index])} alt={photoAlt(photos[index], lang)} fill sizes="100vw" />
            <button type="button" className="icon-btn lightbox__side lightbox__side--next" onClick={() => go(1)} aria-label={d.next}>
              <ArrowIcon />
            </button>
          </div>
          <p className="lightbox__hint small">{d.swipeHint}</p>
        </div>
      )}
    </>
  );
}
