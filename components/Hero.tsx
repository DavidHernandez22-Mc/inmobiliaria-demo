import Image from "next/image";
import { photoAlt, photoSrc } from "@/lib/photos";
import { t, type Lang } from "@/lib/i18n";
import { ArrowIcon } from "./Icons";

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
            src={photoSrc("cerros")}
            alt={photoAlt("cerros", lang)}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 700px) 100vw, 30vw"
          />
        </span>
        <span className="hero__word" aria-hidden="true">
          mira
        </span>
      </div>
      <div className="hero__foot">
        <p className="hero__caption small">{d.caption}</p>
        <p className="hero__sentence">{d.sentence}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#inmuebles">
            {d.primary} <ArrowIcon direction="down" />
          </a>
          <a className="btn btn--outline" href="#propietarios">
            {d.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
