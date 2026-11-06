"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Mode } from "@/data/scenarios";
import { DRIFT_GRADIENT, MODE_LABELS, MODE_ORDER, MODE_POSITION, driftColor, shade } from "@/lib/theme";

type Props = {
  value: number;
  mode: Mode;
};

function stopTransform(position: number): string {
  if (position === 0) return "none";
  if (position === 1) return "translateX(-100%)";
  return "translateX(-50%)";
}

export default function DriftMeter({ value, mode }: Props) {
  const reduceMotion = useReducedMotion();
  const clamped = Math.min(1, Math.max(0, value));
  const percent = Math.round(clamped * 100);
  const color = driftColor(clamped);
  const label = MODE_LABELS[mode];

  return (
    <section
      aria-labelledby="drift-heading"
      className="rounded-2xl border border-line bg-white px-5 py-5 sm:px-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="drift-heading" className="label-mono text-muted">
          Relationship drift
        </h2>
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: shade(color, 0.15) }}>
          {label}
        </p>
      </div>

      <div className="mx-2.5 mt-5">
        <div
          className="relative"
          role="meter"
          aria-labelledby="drift-heading"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-valuetext={`${label} mode, ${percent}% of the way from Tool to Companion`}
        >
          <div className="h-2.5 rounded-full" style={{ background: DRIFT_GRADIENT }} />
          <motion.div
            aria-hidden="true"
            className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] bg-white shadow-[0_1px_4px_rgba(22,35,43,0.25)]"
            initial={false}
            animate={{ left: `${clamped * 100}%`, borderColor: color }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 22 }}
          />
        </div>

        <div aria-hidden="true" className="relative mt-3 h-8 min-[400px]:h-4">
          {MODE_ORDER.map((stop, index) => {
            const position = MODE_POSITION[stop];
            return (
              <span
                key={stop}
                className={`absolute whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.06em] min-[400px]:top-0 sm:text-[11px] sm:tracking-[0.12em] ${
                  index % 2 === 1 ? "top-4" : "top-0"
                } ${stop === mode ? "font-semibold text-ink" : "text-muted"}`}
                style={{ left: `${position * 100}%`, transform: stopTransform(position) }}
              >
                {MODE_LABELS[stop]}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
