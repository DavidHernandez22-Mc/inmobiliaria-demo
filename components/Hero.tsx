import Image from "next/image";
import { photoAlt, photoSrc } from "@/lib/photos";
import { t, type Lang } from "@/lib/i18n";
import { QuickSearch } from "./QuickSearch";

export function Hero({ lang }: { lang: Lang }) {
  const d = t(lang).hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <Image src={photoSrc("hero-bogota")} alt={photoAlt("hero-bogota", lang)} fill priority fetchPriority="high" sizes="100vw" />
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            Altamira<span className="sr-only"> Propiedades</span>
          </h1>
          <p className="hero__sentence">{d.sentence}</p>
        </div>
      </div>
      <div className="hero__card">
        <QuickSearch lang={lang} />
        <a className="btn btn--outline hero__secondary" href="#propietarios">
          {d.secondary}
        </a>
      </div>
    </section>
  );
}
