import { GENERAL_MESSAGE, waLink } from "@/lib/config";
import { homePath, t, type Lang } from "@/lib/i18n";
import { CREDITS } from "@/lib/photos";
import { WhatsAppIcon } from "./Icons";

export function SiteFooter({ lang, altHref }: { lang: Lang; altHref: string }) {
  const d = t(lang);
  const home = homePath(lang);
  const credits = Object.values(CREDITS);
  return (
    <footer className="site-footer inverse">
      <div className="footer__top">
        <div className="footer__invite" data-reveal>
          <h2 className="display">{d.footer.invitation}</h2>
          <a className="btn btn--light" href={waLink(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> {d.footer.cta}
          </a>
        </div>
        <nav className="footer__links" aria-label={d.nav.main}>
          <a href={`${home}#inmuebles`}>{d.nav.listings}</a>
          <a href={`${home}#barrios`}>{d.nav.barrios}</a>
          <a href={`${home}#credito`}>{d.nav.calculator}</a>
          <a href={`${home}#propietarios`}>{d.nav.owners}</a>
          <a href={altHref} hrefLang={lang === "es" ? "en" : "es"} lang={lang === "es" ? "en" : "es"}>
            {d.nav.switchTo}
          </a>
        </nav>
      </div>

      <div className="footer__notes small">
        <p>{d.footer.demoNote}</p>
        <details className="footer__credits">
          <summary>
            {d.footer.photos} ({credits.length})
          </summary>
          <p>{d.footer.photosNote}</p>
          <ul>
            {credits.map((c) => (
              <li key={c.source}>
                <a href={c.source} target="_blank" rel="noopener noreferrer">
                  {c.title}
                </a>{" "}
                · {c.author} ·{" "}
                {c.licenseUrl ? (
                  <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer license">
                    {c.license}
                  </a>
                ) : (
                  c.license
                )}
              </li>
            ))}
          </ul>
        </details>
      </div>

      <div className="footer__legal small">
        <span>
          © 2026 Altamira Propiedades · {d.footer.city}
        </span>
        <span>{d.footer.by}</span>
        <a href="#top" className="link">
          {d.footer.top}
        </a>
      </div>
      <span className="footer__name" aria-hidden="true">
        Altamira
      </span>
    </footer>
  );
}
