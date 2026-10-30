"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { homePath, t, type Lang } from "@/lib/i18n";

export function SiteHeader({ lang, altHref }: { lang: Lang; altHref: string }) {
  const d = t(lang).nav;
  const home = homePath(lang);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: `${home}#inmuebles`, label: d.listings },
    { href: `${home}#barrios`, label: d.barrios },
    { href: `${home}#credito`, label: d.calculator },
    { href: `${home}#propietarios`, label: d.owners },
  ];

  return (
    <header className="site-header">
      <Link href={home} className="wordmark" aria-label="Altamira Propiedades">
        Altamira <span>Propiedades</span>
      </Link>
      <nav className="site-nav" aria-label={d.main}>
        <ul className="site-nav__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a className="lang-switch link" href={altHref} hrefLang={lang === "es" ? "en" : "es"} lang={lang === "es" ? "en" : "es"} aria-label={d.switchTo}>
          {d.switchShort}
        </a>
        <a className="btn btn--dark" href={`${home}#propietarios`}>
          {d.cta}
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? d.close : d.menu}
        </button>
      </nav>
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a className="btn btn--dark" href={`${home}#propietarios`} onClick={() => setOpen(false)}>
          {d.cta}
        </a>
      </div>
    </header>
  );
}
