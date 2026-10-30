import { t, type Lang } from "@/lib/i18n";

export function Testimonials({ lang }: { lang: Lang }) {
  const d = t(lang).testimonials;
  const quote = (q: { quote: string; who: string; role: string }) => (
    <>
      <blockquote>
        <p>“{q.quote}”</p>
      </blockquote>
      <cite>
        {q.who}
        <span>{q.role}</span>
      </cite>
      <span className="example-note">{d.label}</span>
    </>
  );
  return (
    <section className="voices" aria-label={lang === "es" ? "Testimonios de ejemplo" : "Example testimonials"}>
      <figure className="voices__lead" data-reveal>
        {quote(d.lead)}
      </figure>
      <figure className="voices__corner" data-reveal>
        {quote(d.a)}
      </figure>
      <figure className="voices__corner" data-reveal>
        {quote(d.b)}
      </figure>
    </section>
  );
}
