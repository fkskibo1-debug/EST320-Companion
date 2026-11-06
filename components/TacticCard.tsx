"use client";

import { motion } from "framer-motion";
import { TACTIC_LABELS, type Tactic } from "@/data/scenarios";
import { SEVERITY_COLORS, SEVERITY_TEXT_COLORS, withAlpha } from "@/lib/theme";

type Props = {
  tactic: Tactic;
  tacticKey: string;
  cardId: string;
  active: boolean;
  onHover: (key: string | null) => void;
};

export default function TacticCard({ tactic, tacticKey, cardId, active, onHover }: Props) {
  const color = SEVERITY_COLORS[tactic.severity];
  const textColor = SEVERITY_TEXT_COLORS[tactic.severity];

  return (
    <motion.li
      id={cardId}
      data-tactic-key={tacticKey}
      tabIndex={0}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
      }}
      onMouseEnter={() => onHover(tacticKey)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(tacticKey)}
      onBlur={() => onHover(null)}
      className="rounded-xl border border-l-4 border-line bg-white px-4 py-3.5 outline-none transition-shadow duration-150"
      style={{
        borderLeftColor: color,
        boxShadow: active ? `0 0 0 2px ${withAlpha(color, 0.6)}` : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: textColor }}
        >
          {TACTIC_LABELS[tactic.type]}
        </span>
        <span
          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em]"
          style={{ color: textColor }}
        >
          <span className="sr-only">Severity: </span>
          {tactic.severity}
        </span>
      </div>
      <p className="mt-2 text-[15px] font-semibold leading-snug">{tactic.tactic}</p>
      <dl className="mt-2.5 space-y-1.5 text-[13px] leading-snug text-ink/80">
        <div>
          <dt className="mr-1.5 inline font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            Mechanism
          </dt>
          <dd className="inline">{tactic.mechanism}</dd>
        </div>
        <div>
          <dt className="mr-1.5 inline font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            Objective
          </dt>
          <dd className="inline">{tactic.objective}</dd>
        </div>
      </dl>
    </motion.li>
  );
}
