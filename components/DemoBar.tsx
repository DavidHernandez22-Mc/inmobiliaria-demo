import { GENERAL_MESSAGE, waLink } from "@/lib/config";
import { t, type Lang } from "@/lib/i18n";

export function DemoBar({ lang }: { lang: Lang }) {
  const d = t(lang).demo;
  return (
    <aside className="demo-bar" aria-label={d.text}>
      <p className="demo-bar__text">
        {d.text} <span aria-hidden="true">·</span> <span className="demo-bar__q">{d.question}</span>
      </p>
      <a className="demo-bar__btn" href={waLink(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer">
        {d.cta}
      </a>
    </aside>
  );
}
