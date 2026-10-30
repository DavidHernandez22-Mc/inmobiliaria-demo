import { HomePage } from "@/components/HomePage";
import { PageShell } from "@/components/PageShell";
import { t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ lang: "en", path: "/en/", altPath: "/", title: t("en").meta.title, description: t("en").meta.description });

export default function Page() {
  return (
    <PageShell lang="en" altHref="/">
      <HomePage lang="en" />
    </PageShell>
  );
}
