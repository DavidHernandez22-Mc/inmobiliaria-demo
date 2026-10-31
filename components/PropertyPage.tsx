import Link from "next/link";
import { barrioById } from "@/lib/barrios";
import { SITE_NAME, SITE_URL, TRM_LABEL } from "@/lib/config";
import { formatCOP, formatUSD } from "@/lib/format";
import { homePath, propertyPath, t, type Lang } from "@/lib/i18n";
import { PROPERTIES, type Property } from "@/lib/properties";
import { AreaMap } from "./AreaMap";
import { Gallery } from "./Gallery";
import { ArrowIcon } from "./Icons";
import { InterestLink, InterestProvider, VisitPicker } from "./Interest";
import { PriceM2 } from "./PriceM2";
import { JsonLd } from "./JsonLd";
import { MortgageCalculator } from "./MortgageCalculator";
import { ResultRow } from "./ResultRow";

export function PropertyPage({ p, lang }: { p: Property; lang: Lang }) {
  const d = t(lang);
  const dp = d.property;
  const barrio = barrioById(p.barrio);
  const isSale = p.operation === "venta";
  const priceLabel = `${formatCOP(p.price, lang)}${isSale ? "" : ` ${d.search.perMonth}`}`;
  const similar = PROPERTIES.filter((x) => x.code !== p.code && x.operation === p.operation)
    .sort((a, b) => Number(b.barrio === p.barrio) - Number(a.barrio === p.barrio) || Math.abs(a.price - p.price) - Math.abs(b.price - p.price))
    .slice(0, 3);

  const facts: [string, string][] = [
    [dp.code, p.code],
    [dp.area, `${p.area} m²`],
    [dp.bedrooms, String(p.bedrooms)],
    [dp.bathrooms, String(p.bathrooms)],
    [dp.parking, String(p.parking)],
    [dp.stratum, String(p.stratum)],
    [p.type === "casa" ? dp.levels : dp.floor, String(p.floor)],
    [dp.age, dp.ageUnit(p.age)],
    [dp.admin, p.admin ? formatCOP(p.admin, lang) : dp.adminNone],
  ];
  if (p.furnished) facts.push([dp.furnished, dp.yes]);

  const url = `${SITE_URL}${propertyPath(lang, p.code)}`;
  const structured = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.title[lang],
    description: p.description[lang],
    url,
    inLanguage: lang,
    image: p.photos.map((s) => `${SITE_URL}/img/${s}-1200.webp`),
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "COP",
      businessFunction: isSale ? "http://purl.org/goodrelations/v1#Sell" : "http://purl.org/goodrelations/v1#LeaseOut",
      seller: { "@type": "RealEstateAgent", name: SITE_NAME, url: SITE_URL },
    },
    about: {
      "@type": p.type === "casa" ? "SingleFamilyResidence" : "Apartment",
      floorSize: { "@type": "QuantitativeValue", value: p.area, unitCode: "MTK" },
      numberOfRooms: p.bedrooms,
      numberOfBathroomsTotal: p.bathrooms,
      address: { "@type": "PostalAddress", addressLocality: `${barrio.name}, Bogotá`, addressCountry: "CO" },
    },
  };

  return (
    <InterestProvider>
      <JsonLd data={structured} />
      <nav className="prop-crumb" aria-label={dp.back}>
        <Link href={`${homePath(lang)}#inmuebles`} className="crumb">
          <ArrowIcon direction="left" /> {dp.back}
        </Link>
      </nav>
      <div className="prop-head" data-reveal>
        <div className="prop-head__title">
          <h1>{p.title[lang]}</h1>
          <p className="prop-head__meta small">
            <span className={`tag tag--${p.operation}`}>{isSale ? dp.forSale : dp.forRent}</span>
            {p.badge === "nuevo" && <span className="tag tag--nuevo">{d.search.badgeNew}</span>}
            {p.previousPrice && <span className="tag tag--rebajado">{d.search.badgeReduced}</span>}
            <span>
              {dp.types[p.type]} · {barrio.name}, Bogotá · {p.code}
            </span>
          </p>
        </div>
        <div className="prop-head__price">
          {p.previousPrice && (
            <span className="price-before">
              {d.search.before}: {formatCOP(p.previousPrice, lang)}
            </span>
          )}
          <strong>{priceLabel}</strong>
          <span className="small muted">
            {formatUSD(p.price, lang)} · {TRM_LABEL[lang]}
          </span>
        </div>
      </div>

      <Gallery photos={p.photos} lang={lang} title={p.title[lang]} />
      <p className="gallery-note small">{dp.referencePhotos}</p>

      <div className="prop-body">
        <div className="prop-body__main">
          <p className="prop-desc" data-reveal>
            <span>{p.description[lang]}</span>
          </p>

          <section aria-labelledby="facts-title" data-reveal>
            <h2 id="facts-title" className="sr-only">
              {dp.features}
            </h2>
            <dl className="facts" data-reveal>
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <PriceM2 p={p} lang={lang} />

          <section aria-labelledby="features-title" data-reveal>
            <h2 id="features-title" className="h-sub">
              {dp.features}
            </h2>
            <ul className="feature-list">
              {p.features[lang].map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="map-title" data-reveal>
            <h2 id="map-title" className="h-sub">
              {dp.location}
            </h2>
            <AreaMap center={barrio.center} label={`${barrio.name}, Bogotá`} loadingText={dp.mapLoading} />
            <p className="map-note small">{dp.locationNote(barrio.name)}</p>
          </section>
        </div>

        <aside className="prop-body__aside" aria-label={dp.interested}>
          <div className="prop-body__sticky">
            <div className="cta-box">
              <span className="cta-box__price">{priceLabel}</span>
              <span className="small muted">
                {isSale ? dp.price : dp.rent} · {formatUSD(p.price, lang)}
              </span>
              <VisitPicker lang={lang} />
              <InterestLink p={p} lang={lang} className="btn btn--wa btn--block" />
              <span className="small muted">{dp.interestedNote}</span>
            </div>
          </div>
        </aside>
      </div>

      {isSale && (
        <section className="section wrap prop-calc" aria-labelledby="prop-calc-title">
          <MortgageCalculator lang={lang} initialValue={p.price} headingId="prop-calc-title" heading={dp.calcHeading} showIntro={false} />
        </section>
      )}

      <section className="similar" aria-labelledby="similar-title" style={{ paddingTop: "var(--section)" }} data-reveal>
        <h2 id="similar-title" className="h-sub">
          {dp.similar}
        </h2>
        <ul className="results">
          {similar.map((s) => (
            <ResultRow key={s.code} p={s} lang={lang} />
          ))}
        </ul>
      </section>

      <div className="cta-bar">
        <strong>{priceLabel}</strong>
        <InterestLink p={p} lang={lang} className="btn btn--wa" />
      </div>
    </InterestProvider>
  );
}
