import { barrioById } from "@/lib/barrios";
import { formatCOP } from "@/lib/format";
import { t, type Lang } from "@/lib/i18n";
import type { Property } from "@/lib/properties";

export function PriceM2({ p, lang }: { p: Property; lang: Lang }) {
  const d = t(lang).property.m2;
  const barrio = barrioById(p.barrio);
  const per = p.price / p.area;
  const ref = barrio.refM2[p.operation];
  const round = (n: number) => (p.operation === "venta" ? Math.round(n / 1000) * 1000 : Math.round(n / 100) * 100);
  const diff = Math.round(((per - ref) / ref) * 100);
  const max = Math.max(per, ref);
  const unit = `/m²${p.operation === "arriendo" ? d.perMonth : ""}`;
  const verdict = Math.abs(diff) < 3 ? d.equal : diff > 0 ? d.above(diff) : d.below(-diff);

  return (
    <section aria-labelledby="m2-title" data-reveal>
      <h2 id="m2-title" className="h-sub">
        {d.heading}
      </h2>
      <div className="m2">
        <p className="m2__verdict">{verdict}</p>
        <div className="m2__row">
          <span>
            {d.this}
            <br />
            <span className="m2__value">
              {formatCOP(round(per), lang)}
              {unit}
            </span>
          </span>
          <span className="m2__bar" style={{ width: `${(per / max) * 100}%` }} />
        </div>
        <div className="m2__row">
          <span>
            {d.ref(barrio.name)}
            <br />
            <span className="m2__value">
              {formatCOP(ref, lang)}
              {unit}
            </span>
          </span>
          <span className="m2__bar m2__bar--ref" style={{ width: `${(ref / max) * 100}%` }} />
        </div>
        <p className="m2__note small">{d.note}</p>
      </div>
    </section>
  );
}
