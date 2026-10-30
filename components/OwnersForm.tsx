"use client";

import { useId, useState } from "react";
import { BARRIOS } from "@/lib/barrios";
import { DEMO_PREFIX, waLink } from "@/lib/config";
import { formatCOP, formatNumber } from "@/lib/format";
import { t, type Lang } from "@/lib/i18n";

type TypeKey = "apartamento" | "casa" | "apartaestudio" | "oficina" | "local";
type FieldKey = "barrio" | "otherBarrio" | "area" | "price" | "name" | "phone";

const OTHER = "__otro";
const digits = (s: string) => Number(s.replace(/\D/g, "")) || 0;
// El mensaje se escribe en español porque lo recibe David.
const TYPE_ES: Record<TypeKey, string> = {
  apartamento: "apartamento",
  casa: "casa",
  apartaestudio: "apartaestudio",
  oficina: "oficina",
  local: "local",
};

export function OwnersForm({ lang }: { lang: Lang }) {
  const d = t(lang).owners.form;
  const uid = useId();
  const [operation, setOperation] = useState<"vender" | "arrendar">("vender");
  const [type, setType] = useState<TypeKey>("apartamento");
  const [v, setV] = useState<Record<FieldKey, string>>({ barrio: "", otherBarrio: "", area: "", price: "", name: "", phone: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const update = (key: FieldKey, value: string) => {
    setV((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (!v.barrio) e.barrio = d.required;
    if (v.barrio === OTHER && !v.otherBarrio.trim()) e.otherBarrio = d.required;
    const area = digits(v.area);
    if (!v.area) e.area = d.required;
    else if (area < 15 || area > 5000) e.area = d.invalidArea;
    const price = digits(v.price);
    if (!v.price) e.price = d.required;
    else if (price < 500_000) e.price = d.invalidPrice;
    if (!v.name.trim()) e.name = d.required;
    if (!v.phone.trim()) e.phone = d.required;
    return e;
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const first = (Object.keys(e) as FieldKey[])[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    const barrio = v.barrio === OTHER ? v.otherBarrio.trim() : BARRIOS.find((b) => b.id === v.barrio)?.name;
    const message = [
      `${DEMO_PREFIX} quiero ${operation} mi ${TYPE_ES[type]}.`,
      `Barrio: ${barrio}.`,
      `Área: ${digits(v.area)} m².`,
      `Precio esperado: ${formatCOP(digits(v.price), "es")} COP${operation === "arrendar" ? " al mes" : ""}.`,
      `Nombre: ${v.name.trim()}.`,
      `Contacto: ${v.phone.trim()}.`,
    ].join("\n");
    const url = waLink(message);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
  };

  const err = (key: FieldKey) =>
    errors[key] ? (
      <span id={`${uid}-${key}-err`} className="field__error">
        {errors[key]}
      </span>
    ) : null;
  const a11y = (key: FieldKey) => ({
    id: `${uid}-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-err` : undefined,
  });

  return (
    <form className="owners__form" onSubmit={onSubmit} noValidate data-reveal>
      <fieldset className="segmented">
        <legend>{d.operation}</legend>
        {(["vender", "arrendar"] as const).map((op) => (
          <label key={op}>
            <input type="radio" name="owner-op" checked={operation === op} onChange={() => setOperation(op)} />
            <span>{op === "vender" ? d.sell : d.rent}</span>
          </label>
        ))}
      </fieldset>

      <div className="field__row">
        <label className="field">
          <span>{d.type}</span>
          <select className="select" value={type} onChange={(e) => setType(e.target.value as TypeKey)}>
            {(Object.keys(d.types) as TypeKey[]).map((k) => (
              <option key={k} value={k}>
                {d.types[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>{d.barrio}</span>
          <select className="select" value={v.barrio} onChange={(e) => update("barrio", e.target.value)} {...a11y("barrio")}>
            <option value="">—</option>
            {BARRIOS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
            <option value={OTHER}>{d.otherBarrio}</option>
          </select>
          {err("barrio")}
        </label>
      </div>

      {v.barrio === OTHER && (
        <label className="field">
          <span>{d.otherBarrio}</span>
          <input className="input" value={v.otherBarrio} maxLength={60} onChange={(e) => update("otherBarrio", e.target.value)} {...a11y("otherBarrio")} />
          {err("otherBarrio")}
        </label>
      )}

      <div className="field__row">
        <label className="field">
          <span>{d.area}</span>
          <input
            className="input"
            inputMode="numeric"
            autoComplete="off"
            value={v.area}
            onChange={(e) => update("area", e.target.value.replace(/\D/g, "").slice(0, 5))}
            {...a11y("area")}
          />
          {err("area")}
        </label>
        <label className="field">
          <span>{d.price}</span>
          <span className="input-affix">
            <i aria-hidden="true">$</i>
            <input
              className="input"
              inputMode="numeric"
              autoComplete="off"
              value={v.price}
              onChange={(e) => {
                const n = digits(e.target.value);
                update("price", n ? formatNumber(Math.min(n, 99_000_000_000), lang) : "");
              }}
              {...a11y("price")}
            />
          </span>
          {err("price")}
        </label>
      </div>

      <div className="field__row">
        <label className="field">
          <span>{d.name}</span>
          <input className="input" autoComplete="name" maxLength={60} value={v.name} onChange={(e) => update("name", e.target.value)} {...a11y("name")} />
          {err("name")}
        </label>
        <label className="field">
          <span>{d.phone}</span>
          <input className="input" autoComplete="tel" maxLength={80} value={v.phone} onChange={(e) => update("phone", e.target.value)} {...a11y("phone")} />
          {err("phone")}
        </label>
      </div>

      <button type="submit" className="btn btn--light btn--block">
        {d.submit}
      </button>
      <p className="owners__note small">{d.note}</p>
    </form>
  );
}
