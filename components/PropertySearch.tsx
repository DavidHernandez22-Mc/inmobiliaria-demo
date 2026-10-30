"use client";

import { useEffect, useMemo, useState } from "react";
import { BARRIOS, type BarrioId } from "@/lib/barrios";
import { TRM_LABEL } from "@/lib/config";
import { formatCOPShort } from "@/lib/format";
import { t, type Lang } from "@/lib/i18n";
import { PRICE_STEPS, PROPERTIES, type Operation } from "@/lib/properties";
import { ResultRow } from "./ResultRow";

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

export function PropertySearch({ lang }: { lang: Lang }) {
  const d = t(lang).search;
  const [f, setF] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState<Sort>("relevance");
  const [panelOpen, setPanelOpen] = useState(false);

  // Filtros desde la URL (?op=venta&barrio=chico) y desde los paneles de barrios.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const barrio = params.get("barrio") as BarrioId | null;
    const op = params.get("op") as Op | null;
    if ((barrio && BARRIOS.some((b) => b.id === barrio)) || op === "venta" || op === "arriendo") {
      // Se aplica tras la hidratación para que el HTML estático muestre todo el inventario.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setF((prev) => ({
        ...prev,
        barrio: barrio && BARRIOS.some((b) => b.id === barrio) ? barrio : prev.barrio,
        op: op === "venta" || op === "arriendo" ? op : prev.op,
      }));
    }
    const onBarrio = (e: Event) => {
      const id = (e as CustomEvent<BarrioId>).detail;
      setF((prev) => ({ ...prev, barrio: id }));
    };
    window.addEventListener(BARRIO_EVENT, onBarrio);
    return () => window.removeEventListener(BARRIO_EVENT, onBarrio);
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
  }, [f, sort]);

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
          {(activeCount > 0 || f.op !== "all") && (
            <button type="button" className="text-btn" onClick={() => setF(EMPTY)}>
              {d.reset}
            </button>
          )}
        </div>
      </form>

      <div className="wrap">
        {results.length > 0 ? (
          <ul className="results">
            {results.map((p) => (
              <ResultRow key={p.code} p={p} lang={lang} />
            ))}
          </ul>
        ) : (
          <p className="results__empty">{d.empty}</p>
        )}
        <p className="price-note small" style={{ marginTop: 32 }}>
          {d.priceNote} {TRM_LABEL[lang]}.
        </p>
      </div>
    </div>
  );
}
