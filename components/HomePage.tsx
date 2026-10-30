import { SITE_NAME, SITE_URL } from "@/lib/config";
import { BARRIOS } from "@/lib/barrios";
import { homePath, propertyPath, t, type Lang } from "@/lib/i18n";
import { PROPERTIES } from "@/lib/properties";
import { BarriosBand } from "./BarriosBand";
import { Hero } from "./Hero";
import { JsonLd } from "./JsonLd";
import { MortgageCalculator } from "./MortgageCalculator";
import { OwnersForm } from "./OwnersForm";
import { PropertySearch } from "./PropertySearch";
import { Services } from "./Services";
import { Testimonials } from "./Testimonials";

export function HomePage({ lang }: { lang: Lang }) {
  const d = t(lang);
  const url = `${SITE_URL}${homePath(lang)}`;
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": `${SITE_URL}/#agency`,
        name: SITE_NAME,
        description: d.meta.description,
        url,
        image: `${SITE_URL}/og.jpg`,
        areaServed: BARRIOS.map((b) => ({ "@type": "Place", name: `${b.name}, Bogotá` })),
        address: { "@type": "PostalAddress", addressLocality: "Bogotá", addressCountry: "CO" },
        knowsLanguage: ["es", "en"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: lang,
      },
      {
        "@type": "ItemList",
        name: d.search.heading,
        itemListElement: PROPERTIES.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}${propertyPath(lang, p.code)}`,
          name: p.title[lang],
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={structured} />
      <Hero lang={lang} />
      <section id="inmuebles" className="listings section" aria-labelledby="inmuebles-title">
        <PropertySearch lang={lang} />
      </section>
      <BarriosBand lang={lang} />
      <section id="credito" className="section wrap" aria-labelledby="credito-title">
        <MortgageCalculator lang={lang} headingId="credito-title" heading={d.calc.heading} />
      </section>
      <section id="propietarios" className="section wrap inverse" aria-labelledby="propietarios-title">
        <div className="owners">
          <h2 id="propietarios-title" className="h-section owners__title" data-reveal>
            <span>{d.owners.heading}</span>
          </h2>
          <div className="owners__copy" data-reveal>
            <p className="lead">{d.owners.intro}</p>
            <ul className="owners__steps">
              {d.owners.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <OwnersForm lang={lang} />
        </div>
      </section>
      <Services lang={lang} />
      <Testimonials lang={lang} />
    </>
  );
}
