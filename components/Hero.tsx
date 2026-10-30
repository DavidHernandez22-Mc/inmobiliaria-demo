import Image from "next/image";
import { photoAlt, photoSrc } from "@/lib/photos";
import { t, type Lang } from "@/lib/i18n";
import { QuickSearch } from "./QuickSearch";

export function Hero({ lang }: { lang: Lang }) {
  const d = t(lang).hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        {d.h1}
      </h1>
      <div className="hero__mark">
        <span className="hero__word" aria-hidden="true">
          Alta
        </span>
        <span className="hero__frame shutter">
          <Image
            src={photoSrc("hero-bogota")}
            alt={photoAlt("hero-bogota", lang)}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 700px) 40vw, 30vw"
          />
        </span>
        <span className="hero__word" aria-hidden="true">
          mira
        </span>
      </div>
      <div className="hero__body">
        <div className="hero__intro">
          <p className="hero__sentence">{d.sentence}</p>
          <a className="btn btn--outline hero__secondary" href="#propietarios">
            {d.secondary}
          </a>
        </div>
        <QuickSearch lang={lang} />
        <a className="btn btn--outline hero__mobile-secondary" href="#propietarios">
          {d.secondary}
        </a>
      </div>
      <p className="hero__caption small">{d.caption}</p>
    </section>
  );
}
