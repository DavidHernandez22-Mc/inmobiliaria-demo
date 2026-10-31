"use client";

import { useEffect, useMemo, useState } from "react";
import { BARRIOS, type BarrioId } from "@/lib/barrios";
import { DEMO_PREFIX, TRM_LABEL, waLink } from "@/lib/config";
import { formatCOP, formatCOPShort } from "@/lib/format";
import { t, type Lang } from "@/lib/i18n";
import { useFavorites } from "@/lib/favorites";
import { PRICE_STEPS, PROPERTIES, type Operation } from "@/lib/properties";
import { WhatsAppIcon } from "./Icons";
import { ResultRow } from "./ResultRow";

// El mensaje va en español porque lo recibe David.
function favoritesMessage(codes: string[]) {
  const lines = PROPERTIES.filter((p) => codes.includes(p.code)).map(
    (p) => `• ${p.code} – ${p.title.es} – ${formatCOP(p.price, "es")} COP${p.operation === "arriendo" ? " al mes" : ""}`,
  );
  return `${DEMO_PREFIX} estos son mis inmuebles favoritos:\n${lines.join("\n")}`;
}

type Sort = "relevance" | "priceAsc" | "priceDesc" | "areaAsc" | "areaDesc";
type Op = "all" | Operation;

interface Filters {
  op: Op;
  barrio: "" | BarrioId;
  pmin: number;
  pmax: number;
  beds: number;
  baths: number;
  parking: number;
  amin: number;
  amax: number;
}

const EMPTY: Filters = { op: "all", barrio: "", pmin: 0, pmax: 0, beds: 0, baths: 0, parking: 0, amin: 0, amax: 0 };
const AREA_STEPS = [40, 60, 80, 100, 150, 200, 300];
export const BARRIO_EVENT = "altamira:barrio";
export const SEARCH_EVENT = "altamira:search";
export type QuickSearchDetail = { op: Operation; barrio: "" | BarrioId; pmax: number };

export function PropertySearch({ lang }: { lang: Lang }) {
  const d = t(lang).search;
  const [f, setF] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState<Sort>("relevance");
  const [panelOpen, setPanelOpen] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const { favorites } = useFavorites();

  // Filtros desde la URL (?op=venta&barrio=chico) y desde los paneles de barrios.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const barrioParam = params.get("barrio") as BarrioId | null;
    const opParam = params.get("op");
    const pmaxParam = Number(params.get("pmax")) || 0;
    const barrio = barrioParam && BARRIOS.some((b) => b.id === barrioParam) ? barrioParam : null;
    const op = opParam === "venta" || opParam === "arriendo" ? opParam : null;
    if (barrio || op) {
      // Se aplica tras la hidratación para que el HTML estático muestre todo el inventario.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setF((prev) => ({
        ...prev,
        barrio: barrio ?? prev.barrio,
        op: op ?? prev.op,
        pmax: op && PRICE_STEPS[op].includes(pmaxParam) ? pmaxParam : prev.pmax,
      }));
    }
    const onBarrio = (e: Event) => {
      const id = (e as CustomEvent<BarrioId>).detail;
      setF((prev) => ({ ...prev, barrio: id }));
    };
    const onSearch = (e: Event) => {
      const { op, barrio, pmax } = (e as CustomEvent<QuickSearchDetail>).detail;
      setOnlyFavs(false);
      setF({ ...EMPTY, op, barrio, pmax });
    };
    window.addEventListener(BARRIO_EVENT, onBarrio);
    window.addEventListener(SEARCH_EVENT, onSearch);
    return () => {
      window.removeEventListener(BARRIO_EVENT, onBarrio);
      window.removeEventListener(SEARCH_EVENT, onSearch);
    };
  }, []);

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setF((prev) => {
      const next = { ...prev, [key]: value };
      // Los rangos de precio de venta y arriendo no son comparables.
      if (key === "op") {
        next.pmin = 0;
        next.pmax = 0;
      }
      return next;
    });

  const results = useMemo(() => {
    const list = PROPERTIES.filter(
      (p) =>
        (!onlyFavs || favorites.includes(p.code)) &&
        (f.op === "all" || p.operation === f.op) &&
        (!f.barrio || p.barrio === f.barrio) &&
        (!f.pmin || p.price >= f.pmin) &&
        (!f.pmax || p.price <= f.pmax) &&
        p.bedrooms >= f.beds &&
        p.bathrooms >= f.baths &&
        p.parking >= f.parking &&
        (!f.amin || p.area >= f.amin) &&
        (!f.amax || p.area <= f.amax),
    );
    const sorted = [...list];
    if (sort === "priceAsc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "areaAsc") sorted.sort((a, b) => a.area - b.area);
    if (sort === "areaDesc") sorted.sort((a, b) => b.area - a.area);
    return sorted;
  }, [f, sort, onlyFavs, favorites]);

  const activeCount = (Object.keys(EMPTY) as (keyof Filters)[]).filter((k) => k !== "op" && f[k] !== EMPTY[k]).length;
  const priceSteps = f.op === "all" ? [] : PRICE_STEPS[f.op];
  const num = (v: string) => Number(v) || 0;

  return (
    <div>
      <div className="listings__head wrap" data-reveal>
        <h2 id="inmuebles-title" className="h-section">{d.heading}</h2>
        <p className="listings__count" aria-live="polite" aria-atomic="true">
          {d.count(results.length)}
        </p>
      </div>

      <form className="filters wrap" onSubmit={(e) => e.preventDefault()} aria-label={d.filters}>
        <fieldset className="segmented filters__op">
          <legend>{d.operation}</legend>
          {(["all", "venta", "arriendo"] as Op[]).map((op) => (
            <label key={op}>
              <input type="radio" name="op" value={op} checked={f.op === op} onChange={() => set("op", op)} />
              <span>{op === "all" ? d.all : d[op]}</span>
            </label>
          ))}
        </fieldset>

        <button
          type="button"
          className="btn btn--outline filters__toggle"
          aria-expanded={panelOpen}
          aria-controls="filters-panel"
          onClick={() => setPanelOpen((v) => !v)}
        >
          <span>
            {d.filters}
            {activeCount > 0 ? ` (${activeCount})` : ""}
          </span>
          <span aria-hidden="true">{panelOpen ? "–" : "+"}</span>
        </button>

        <div id="filters-panel" className="filters__panel" data-open={panelOpen}>
          <label className="field filters__field--barrio">
            <span>{d.barrio}</span>
            <select className="select" value={f.barrio} onChange={(e) => set("barrio", e.target.value as Filters["barrio"])}>
              <option value="">{d.anyBarrio}</option>
              {BARRIOS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field filters__field--pmin">
            <span>{d.priceMin}</span>
            <select
              className="select"
              value={f.pmin}
              disabled={f.op === "all"}
              title={f.op === "all" ? d.venta + " / " + d.arriendo : undefined}
              onChange={(e) => set("pmin", num(e.target.value))}
            >
              <option value={0}>{f.op === "all" ? `${d.venta} / ${d.arriendo}` : d.any}</option>
              {priceSteps.map((v) => (
                <option key={v} value={v}>
                  {formatCOPShort(v, lang)}
                </option>
              ))}
            </select>
          </label>
          <label className="field filters__field--pmax">
            <span>{d.priceMax}</span>
            <select className="select" value={f.pmax} disabled={f.op === "all"} onChange={(e) => set("pmax", num(e.target.value))}>
              <option value={0}>{f.op === "all" ? `${d.venta} / ${d.arriendo}` : d.any}</option>
              {priceSteps.map((v) => (
                <option key={v} value={v}>
                  {formatCOPShort(v, lang)}
                </option>
              ))}
            </select>
          </label>

          <div className="filters__more">
            {(
              [
                ["beds", d.bedrooms, [1, 2, 3, 4]],
                ["baths", d.bathrooms, [1, 2, 3, 4]],
                ["parking", d.parking, [1, 2, 3]],
              ] as const
            ).map(([key, label, steps]) => (
              <label className="field" key={key}>
                <span>{label}</span>
                <select className="select" value={f[key]} onChange={(e) => set(key, num(e.target.value))}>
                  <option value={0}>{d.any}</option>
                  {steps.map((n) => (
                    <option key={n} value={n}>
                      {d.minLabel(n)}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            <label className="field">
              <span>{d.areaMin}</span>
              <select className="select" value={f.amin} onChange={(e) => set("amin", num(e.target.value))}>
                <option value={0}>{d.any}</option>
                {AREA_STEPS.map((n) => (
                  <option key={n} value={n}>
                    {n} m²
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>{d.areaMax}</span>
              <select className="select" value={f.amax} onChange={(e) => set("amax", num(e.target.value))}>
                <option value={0}>{d.any}</option>
                {AREA_STEPS.map((n) => (
                  <option key={n} value={n}>
                    {n} m²
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="filters__bar">
          <label className="filters__sort">
            <span className="small muted">{d.sort}</span>
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              {(Object.keys(d.sortOptions) as Sort[]).map((s) => (
                <option key={s} value={s}>
                  {d.sortOptions[s]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="fav-filter"
            aria-pressed={onlyFavs}
            onClick={() => setOnlyFavs((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.3 4.5 6.9 4.5c2 0 3.4 1.1 5.1 3 1.7-1.9 3.1-3 5.1-3 3.6 0 5.5 3.5 4.2 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z"
                fill={onlyFavs ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            {d.favorites} ({favorites.length})
          </button>
          {(activeCount > 0 || f.op !== "all" || onlyFavs) && (
            <button
              type="button"
              className="text-btn"
              onClick={() => {
                setF(EMPTY);
                setOnlyFavs(false);
              }}
            >
              {d.reset}
            </button>
          )}
        </div>
      </form>

      <div className="wrap">
        {onlyFavs && favorites.length > 0 && (
          <div className="fav-send">
            <p>{d.sendFavsNote(favorites.length)}</p>
            <a className="btn btn--wa" href={waLink(favoritesMessage(favorites))} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> {d.sendFavs}
            </a>
          </div>
        )}
        {results.length > 0 ? (
          <ul className="results">
            {results.map((p) => (
              <ResultRow key={p.code} p={p} lang={lang} />
            ))}
          </ul>
        ) : (
          <p className="results__empty">{onlyFavs && favorites.length === 0 ? d.favEmpty : d.empty}</p>
        )}
        <p className="price-note small" style={{ marginTop: 32 }}>
          {d.priceNote} {TRM_LABEL[lang]}.
        </p>
      </div>
    </div>
  );
}
