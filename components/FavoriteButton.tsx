"use client";

import { useFavorites } from "@/lib/favorites";
import { t, type Lang } from "@/lib/i18n";

export function FavoriteButton({ code, title, lang }: { code: string; title: string; lang: Lang }) {
  const { isFavorite, toggle } = useFavorites();
  const on = isFavorite(code);
  const d = t(lang).search;
  return (
    <button
      type="button"
      className="fav-btn"
      aria-pressed={on}
      aria-label={on ? d.removeFav(title) : d.addFav(title)}
      title={on ? d.removeFav(title) : d.addFav(title)}
      onClick={() => toggle(code)}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.3 4.5 6.9 4.5c2 0 3.4 1.1 5.1 3 1.7-1.9 3.1-3 5.1-3 3.6 0 5.5 3.5 4.2 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z"
          fill={on ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
