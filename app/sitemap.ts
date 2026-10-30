import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { propertyPath } from "@/lib/i18n";
import { PROPERTIES } from "@/lib/properties";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: `${SITE_URL}/`,
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: { languages: { "es-CO": `${SITE_URL}/`, en: `${SITE_URL}/en/` } },
  };
  const homeEn = { ...home, url: `${SITE_URL}/en/`, priority: 0.9 };
  const props = PROPERTIES.flatMap((p) => {
    const languages = { "es-CO": `${SITE_URL}${propertyPath("es", p.code)}`, en: `${SITE_URL}${propertyPath("en", p.code)}` };
    return [
      { url: languages["es-CO"], changeFrequency: "weekly" as const, priority: 0.8, alternates: { languages } },
      { url: languages.en, changeFrequency: "weekly" as const, priority: 0.7, alternates: { languages } },
    ];
  });
  return [home, homeEn, ...props];
}
