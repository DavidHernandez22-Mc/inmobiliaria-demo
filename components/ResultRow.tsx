import Image from "next/image";
import Link from "next/link";
import { barrioById } from "@/lib/barrios";
import { formatCOP, formatUSD } from "@/lib/format";
import { propertyPath, t, type Lang } from "@/lib/i18n";
import { photoAlt, photoSrc } from "@/lib/photos";
import type { Property } from "@/lib/properties";

export function ResultRow({ p, lang, headingLevel = 3 }: { p: Property; lang: Lang; headingLevel?: 2 | 3 }) {
  const d = t(lang);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <li>
      <Link href={propertyPath(lang, p.code)} className="result">
        <div className="result__photo">
          <Image
            src={photoSrc(p.photos[0])}
            alt={photoAlt(p.photos[0], lang)}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 30vw, 22vw"
          />
        </div>
        <div>
          <Heading className="result__title">{p.title[lang]}</Heading>
          <p className="result__where small">
            {barrioById(p.barrio).name} · {d.property.types[p.type]} · {p.code}
          </p>
        </div>
        <p className="result__specs small">
          <span className={`tag tag--${p.operation}`}>{p.operation === "venta" ? d.property.forSale : d.property.forRent}</span>
          <span>{p.area} m²</span>
          <span>{d.search.beds(p.bedrooms)}</span>
          <span>{d.search.baths(p.bathrooms)}</span>
          <span>{d.search.parks(p.parking)}</span>
          <span>{d.search.stratum(p.stratum)}</span>
        </p>
        <p className="result__price">
          <span className="result__cop">
            {formatCOP(p.price, lang)}
            {p.operation === "arriendo" && <span className="small muted"> {d.search.perMonth}</span>}
          </span>
          <span className="result__usd small">{formatUSD(p.price, lang)}</span>
        </p>
      </Link>
    </li>
  );
}
