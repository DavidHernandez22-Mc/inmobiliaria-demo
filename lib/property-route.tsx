import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PropertyPage } from "@/components/PropertyPage";
import { barrioById } from "./barrios";
import { formatCOP } from "./format";
import { propertyPath, t, type Lang } from "./i18n";
import { buildMetadata } from "./metadata";
import { PROPERTIES, propertyByCode } from "./properties";

type Params = Promise<{ code: string }>;

export const propertyStaticParams = () => PROPERTIES.map((p) => ({ code: p.code }));

export async function propertyMetadata(lang: Lang, params: Params) {
  const { code } = await params;
  const p = propertyByCode(code);
  if (!p) return {};
  const other: Lang = lang === "es" ? "en" : "es";
  const price = `${formatCOP(p.price, lang)}${p.operation === "arriendo" ? t(lang).search.perMonth : ""}`;
  return buildMetadata({
    lang,
    path: propertyPath(lang, p.code),
    altPath: propertyPath(other, p.code),
    title: `${p.title[lang]} · ${p.code} · Altamira Propiedades`,
    description: `${price} · ${p.area} m² · ${t(lang).search.beds(p.bedrooms)} · ${barrioById(p.barrio).name}, Bogotá. ${p.description[lang].slice(0, 110)}…`,
  });
}

export async function PropertyRoute({ lang, params }: { lang: Lang; params: Params }) {
  const { code } = await params;
  const p = propertyByCode(code);
  if (!p) notFound();
  const other: Lang = lang === "es" ? "en" : "es";
  return (
    <PageShell lang={lang} altHref={propertyPath(other, p.code)}>
      <PropertyPage p={p} lang={lang} />
    </PageShell>
  );
}
