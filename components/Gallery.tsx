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
            <span className="small">{d.photoOf(index + 1, n)}</span>
            <button ref={closeRef} type="button" className="icon-btn" onClick={close} aria-label={d.close}>
              <CloseIcon />
            </button>
          </div>
          <div className="lightbox__stage">
            <Image src={photoSrc(photos[index])} alt={photoAlt(photos[index], lang)} fill sizes="100vw" />
          </div>
          <div className="lightbox__nav">
            <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label={d.prev}>
              <ArrowIcon direction="left" />
            </button>
            <button type="button" className="icon-btn" onClick={() => go(1)} aria-label={d.next}>
              <ArrowIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
