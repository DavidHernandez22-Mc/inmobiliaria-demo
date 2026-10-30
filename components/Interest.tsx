"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import { waLink } from "@/lib/config";
import { interestMessage } from "@/lib/format";
import { t, type Lang } from "@/lib/i18n";
import type { Property } from "@/lib/properties";
import { WhatsAppIcon } from "./Icons";

type Slot = "manana" | "tarde";
interface Visit {
  date: string | null;
  slot: Slot;
  setDate: (d: string | null) => void;
  setSlot: (s: Slot) => void;
}

const VisitContext = createContext<Visit | null>(null);

export function InterestProvider({ children }: { children: ReactNode }) {
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot>("manana");
  return <VisitContext.Provider value={{ date, slot, setDate, setSlot }}>{children}</VisitContext.Provider>;
}

const useVisit = () => useContext(VisitContext)!;

// Próximos 10 días hábiles (lunes a sábado). Se calculan en el navegador para no fijar la fecha del build.
let cachedDays: string[] | null = null;
function getDays() {
  if (cachedDays) return cachedDays;
  const days: string[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (days.length < 10) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) days.push(d.toISOString().slice(0, 10));
  }
  cachedDays = days;
  return days;
}
const noDays: string[] = [];
const useDays = () => useSyncExternalStore(() => () => {}, getDays, () => noDays);

const parse = (iso: string) => new Date(`${iso}T12:00:00`);
const longDate = (iso: string, lang: Lang) =>
  parse(iso).toLocaleDateString(lang === "es" ? "es-CO" : "en-US", { weekday: "long", day: "numeric", month: "long" });

function messageFor(p: Property, date: string | null, slot: Slot) {
  const base = interestMessage(p);
  if (!date) return base;
  const when = slot === "manana" ? "en la mañana (8 a. m. a 12 m.)" : "en la tarde (2 p. m. a 6 p. m.)";
  return `${base} Me gustaría agendar una visita el ${longDate(date, "es")} ${when}.`;
}

export function VisitPicker({ lang }: { lang: Lang }) {
  const d = t(lang).property.visit;
  const { date, slot, setDate, setSlot } = useVisit();
  const days = useDays();
  const locale = lang === "es" ? "es-CO" : "en-US";

  return (
    <div className="visit">
      <p className="visit__title" id="visit-title">
        {d.heading}
      </p>
      <div className="visit__days" role="group" aria-label={d.day}>
        {days.map((iso) => {
          const day = parse(iso);
          return (
            <button
              key={iso}
              type="button"
              className="chip"
              aria-pressed={date === iso}
              aria-label={longDate(iso, lang)}
              onClick={() => setDate(date === iso ? null : iso)}
            >
              <small>{day.toLocaleDateString(locale, { weekday: "short" }).replace(".", "")}</small>
              <strong>{day.getDate()}</strong>
            </button>
          );
        })}
      </div>
      <fieldset className="segmented">
        <legend>{d.slot}</legend>
        {(["manana", "tarde"] as const).map((s) => (
          <label key={s}>
            <input type="radio" name="visit-slot" checked={slot === s} onChange={() => setSlot(s)} />
            <span>
              {s === "manana" ? d.morning : d.afternoon}
              <small>{s === "manana" ? d.morningHours : d.afternoonHours}</small>
            </span>
          </label>
        ))}
      </fieldset>
      <p className="small muted" aria-live="polite">
        {date ? (
          <span className="visit__summary">
            {longDate(date, lang)} · {slot === "manana" ? d.morning : d.afternoon}
          </span>
        ) : (
          d.note
        )}
      </p>
    </div>
  );
}

export function InterestLink({ p, lang, className }: { p: Property; lang: Lang; className: string }) {
  const { date, slot } = useVisit();
  return (
    <a className={className} href={waLink(messageFor(p, date, slot))} target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon /> {t(lang).property.interested}
    </a>
  );
}
