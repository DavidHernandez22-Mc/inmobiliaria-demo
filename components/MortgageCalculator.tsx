"use client";

import { useId, useMemo, useState } from "react";
import { TRM_LABEL } from "@/lib/config";
import { formatCOP, formatNumber, formatUSD } from "@/lib/format";
import { t, type Lang } from "@/lib/i18n";

const MIN_DOWN = 30;
const TERMS = [5, 10, 15, 20, 25, 30];

/** Cuota fija mensual a partir de una tasa efectiva anual. */
export function monthlyPayment(loan: number, annualEffectivePct: number, years: number) {
  const n = years * 12;
  const i = Math.pow(1 + annualEffectivePct / 100, 1 / 12) - 1;
  if (loan <= 0 || n <= 0) return 0;
  if (i === 0) return loan / n;
  return (loan * i) / (1 - Math.pow(1 + i, -n));
}

const digits = (s: string) => Number(s.replace(/\D/g, "")) || 0;

export function MortgageCalculator({
  lang,
  initialValue = 1_200_000_000,
  headingId,
  heading,
  showIntro = true,
}: {
  lang: Lang;
  initialValue?: number;
  headingId: string;
  heading: string;
  showIntro?: boolean;
}) {
  const d = t(lang).calc;
  const uid = useId();
  const [valueText, setValueText] = useState(formatNumber(initialValue, lang));
  const [down, setDown] = useState(MIN_DOWN);
  const [years, setYears] = useState(15);
  const [rateText, setRateText] = useState(lang === "es" ? "12,5" : "12.5");

  const value = digits(valueText);
  const rate = Number(rateText.replace(",", ".")) || 0;
  const valueOk = value >= 50_000_000;
  const rateOk = rate > 0 && rate < 60;

  const r = useMemo(() => {
    const loan = (value * (100 - down)) / 100;
    const monthly = monthlyPayment(loan, rate, years);
    const total = monthly * years * 12;
    return { loan, monthly, total, interest: total - loan, downAmount: value - loan };
  }, [value, down, years, rate]);

  const ready = valueOk && rateOk;

  return (
    <div className="calc">
      <div className="calc__intro" data-reveal>
        <h2 id={headingId} className="h-section">
          {heading}
        </h2>
        {showIntro && <p>{d.intro}</p>}
      </div>

      <form className="calc__form" onSubmit={(e) => e.preventDefault()} aria-labelledby={headingId}>
        <label className="field">
          <span>{d.value}</span>
          <span className="input-affix">
            <i aria-hidden="true">$</i>
            <input
              className="input"
              inputMode="numeric"
              autoComplete="off"
              value={valueText}
              aria-invalid={!valueOk}
              aria-describedby={!valueOk ? `${uid}-verr` : undefined}
              onChange={(e) => {
                const n = digits(e.target.value);
                setValueText(n ? formatNumber(Math.min(n, 99_000_000_000), lang) : "");
              }}
            />
          </span>
          {!valueOk && (
            <span id={`${uid}-verr`} className="field__error">
              {d.errorValue}
            </span>
          )}
        </label>

        <div className="field">
          <label htmlFor={`${uid}-down`}>
            <span className="small muted">
              {d.down} · {d.downHint}
            </span>
          </label>
          <div className="range-row">
            <input
              id={`${uid}-down`}
              className="range"
              type="range"
              min={MIN_DOWN}
              max={90}
              step={1}
              value={down}
              style={{ "--fill": `${((down - MIN_DOWN) / (90 - MIN_DOWN)) * 100}%` } as React.CSSProperties}
              aria-valuetext={`${down} % · ${formatCOP(r.downAmount, lang)}`}
              onChange={(e) => setDown(Math.max(MIN_DOWN, Number(e.target.value)))}
            />
            <output htmlFor={`${uid}-down`}>{down} %</output>
          </div>
          <span className="field__hint">{formatCOP(r.downAmount, lang)}</span>
        </div>

        <div className="field__row">
          <label className="field">
            <span>{d.years}</span>
            <select className="select" value={years} onChange={(e) => setYears(Number(e.target.value))}>
              {TERMS.map((y) => (
                <option key={y} value={y}>
                  {d.yearsUnit(y)}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>{d.rate}</span>
            <span className="input-affix input-affix--suffix">
              <input
                className="input"
                inputMode="decimal"
                autoComplete="off"
                value={rateText}
                aria-invalid={!rateOk}
                aria-describedby={`${uid}-rhint`}
                onChange={(e) => setRateText(e.target.value.replace(/[^\d.,]/g, "").slice(0, 5))}
              />
              <i aria-hidden="true">% E.A.</i>
            </span>
            <span id={`${uid}-rhint`} className="field__hint">
              {d.rateHint}
            </span>
          </label>
        </div>
      </form>

      <div className="calc__result" aria-live="polite">
        <div className="calc__hero">
          <p className="calc__monthly-label">{d.monthly}</p>
          <strong className="calc__monthly">{ready ? formatCOP(r.monthly, lang) : "…"}</strong>
          <span className="calc__monthly-usd small">
            {ready ? `${formatUSD(r.monthly, lang)} · ${d.yearsUnit(years)} · ${rateText} % E.A.` : d.errorValue}
          </span>
        </div>
        <p className="calc__rows-title">{d.summary}</p>
        <dl className="calc__rows">
          <div className="calc__row">
            <dt>{d.loan}</dt>
            <dd>{ready ? formatCOP(r.loan, lang) : "…"}</dd>
          </div>
          <div className="calc__row">
            <dt>{d.interest}</dt>
            <dd>{ready ? formatCOP(r.interest, lang) : "…"}</dd>
          </div>
          <div className="calc__row">
            <dt>{d.total}</dt>
            <dd>{ready ? formatCOP(r.total, lang) : "…"}</dd>
          </div>
          <div className="calc__row">
            <dt>{d.totalWithDown}</dt>
            <dd>{ready ? formatCOP(r.total + r.downAmount, lang) : "…"}</dd>
          </div>
        </dl>
        <p className="calc__disclaimer small">
          {d.disclaimer} {TRM_LABEL[lang]}.
        </p>
      </div>
    </div>
  );
}
