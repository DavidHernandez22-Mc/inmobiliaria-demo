import { HomePage } from "@/components/HomePage";
import { PageShell } from "@/components/PageShell";
import { t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ lang: "es", path: "/", altPath: "/en/", title: t("es").meta.title, description: t("es").meta.description });

export default function Page() {
  return (
    <PageShell lang="es" altHref="/en/">
      <HomePage lang="es" />
    </PageShell>
  );
}
