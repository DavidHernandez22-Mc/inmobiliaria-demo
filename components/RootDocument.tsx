import type { ReactNode } from "react";
import { erode, generalSans } from "@/app/fonts";
import type { Lang } from "@/lib/i18n";
import { DemoBar } from "./DemoBar";
import { Reveal } from "./Reveal";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function RootDocument({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang === "es" ? "es-CO" : "en"} className={`${erode.variable} ${generalSans.variable}`}>
      <body id="top">
        <a className="skip-link" href="#contenido">
          {lang === "es" ? "Saltar al contenido" : "Skip to content"}
        </a>
        <DemoBar lang={lang} />
        {children}
        <WhatsAppFloat lang={lang} />
        <Reveal />
      </body>
    </html>
  );
}
