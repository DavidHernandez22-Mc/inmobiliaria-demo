import type { ReactNode } from "react";
import type { Lang } from "@/lib/i18n";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageShell({ lang, altHref, children }: { lang: Lang; altHref: string; children: ReactNode }) {
  return (
    <>
      <SiteHeader lang={lang} altHref={altHref} />
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter lang={lang} altHref={altHref} />
    </>
  );
}
