"use client";

import { useState } from "react";
import { BARRIOS, type BarrioId } from "@/lib/barrios";
import { formatCOPShort } from "@/lib/format";
import { t, type Lang } from "@/lib/i18n";
import { PRICE_STEPS, type Operation } from "@/lib/properties";
import { SEARCH_EVENT, type QuickSearchDetail } from "./PropertySearch";

export function QuickSearch({ lang }: { lang: Lang }) {
  const d = t(lang).hero.quick;
  const [op, setOp] = useState<Operation>("venta");
  const [barrio, setBarrio] = useState<"" | BarrioId>("");
  const [pmax, setPmax] = useState(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Sin JavaScript el formulario recarga con ?op=&barrio=&pmax= y el buscador los lee.
    e.preventDefault();
    const detail: QuickSearchDetail = { op, barrio, pmax };
    window.dispatchEvent(new CustomEvent(SEARCH_EVENT, { detail }));
    const params = new URLSearchParams({ op });
    if (barrio) params.set("barrio", barrio);
    if (pmax) params.set("pmax", String(pmax));
    history.replaceState(null, "", `?${params}#inmuebles`);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("inmuebles")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <form className="quick" action="#inmuebles" method="get" onSubmit={onSubmit} aria-label={d.legend}>
      <fieldset className="segmented quick__op">
        <legend>{d.operation}</legend>
        {(["venta", "arriendo"] as const).map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="op"
              value={value}
              checked={op === value}
              onChange={() => {
                setOp(value);
                setPmax(0);
              }}
            />
            <span>{value === "venta" ? d.buy : d.rent}</span>
          </label>
        ))}
      </fieldset>
      <label className="field quick__barrio">
        <span>{d.barrio}</span>
        <select className="select" name="barrio" value={barrio} onChange={(e) => setBarrio(e.target.value as "" | BarrioId)}>
          <option value="">{d.anyBarrio}</option>
          {BARRIOS.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </label>
      <label className="field quick__budget">
        <span>{d.budget}</span>
        <select className="select" name="pmax" value={pmax} onChange={(e) => setPmax(Number(e.target.value))}>
          <option value={0}>{d.anyBudget}</option>
          {PRICE_STEPS[op].map((v) => (
            <option key={v} value={v}>
              {formatCOPShort(v, lang)}
              {op === "arriendo" ? t(lang).search.perMonth : ""}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="btn btn--primary quick__submit">
        <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {d.search}
      </button>
    </form>
  );
}
