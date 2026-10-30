import { GENERAL_MESSAGE, waLink } from "@/lib/config";
import { t, type Lang } from "@/lib/i18n";
import { WhatsAppIcon } from "./Icons";

export function WhatsAppFloat({ lang }: { lang: Lang }) {
  return (
    <a
      className="wa-float"
      href={waLink(GENERAL_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(lang).whatsapp.float}
      title={t(lang).whatsapp.float}
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
