import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./config";
import type { Lang } from "./i18n";

export function buildMetadata({
  lang,
  path,
  altPath,
  title,
  description,
  image = "/og.jpg",
}: {
  lang: Lang;
  path: string;
  altPath: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const esPath = lang === "es" ? path : altPath;
  const enPath = lang === "en" ? path : altPath;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: path,
      languages: { "es-CO": esPath, en: enPath, "x-default": esPath },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      title,
      description,
      locale: lang === "es" ? "es_CO" : "en_US",
      alternateLocale: lang === "es" ? ["en_US"] : ["es_CO"],
      images: [{ url: `${SITE_URL}${image}`, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${image}`],
    },
    robots: { index: true, follow: true },
    icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }], apple: "/apple-touch-icon.png" },
  };
}
