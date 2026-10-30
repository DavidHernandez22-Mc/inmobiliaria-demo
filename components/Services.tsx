import { t, type Lang } from "@/lib/i18n";

export function Services({ lang }: { lang: Lang }) {
  const d = t(lang).services;
  return (
    <section className="services wrap" aria-labelledby="services-title">
      <h2 id="services-title" className="h-section" data-reveal>
        <span>{d.heading}</span>
      </h2>
      <div className="services__grid" data-reveal>
        {d.groups.map((g) => (
          <div className="services__group" key={g.name}>
            <h3 className="services__name">{g.name}</h3>
            <ul className="services__items">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="services__group-summary">{g.summary}</p>
          </div>
        ))}
        <p className="services__summary">{d.summary}</p>
      </div>
    </section>
  );
}
