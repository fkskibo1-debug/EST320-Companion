"use client";

import { Fragment, type ReactNode } from "react";
import { TACTIC_LABELS } from "@/data/scenarios";
import type { QuoteRange } from "@/lib/highlights";
import { SEVERITY_COLORS, SEVERITY_TEXT_COLORS, withAlpha } from "@/lib/theme";

type Props = {
  text: string;
  ranges: QuoteRange[];
  activeKey: string | null;
  /** Only link to sidebar cards when they are rendered, i.e. the message is selected. */
  linkToCards: boolean;
  onActivate: (key: string) => void;
  onDeactivate: () => void;
};

export default function HighlightedParagraph({
  text,
  ranges,
  activeKey,
  linkToCards,
  onActivate,
  onDeactivate,
}: Props) {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const range of ranges) {
    if (range.start > cursor) parts.push(text.slice(cursor, range.start));

    const { tactic } = range;
    const color = SEVERITY_COLORS[tactic.severity];
    const active = range.key === activeKey;

    parts.push(
      <Fragment key={range.key}>
        <mark
          tabIndex={0}
          aria-describedby={linkToCards ? range.cardId : undefined}
          onMouseEnter={() => onActivate(range.key)}
          onMouseLeave={onDeactivate}
          onFocus={() => onActivate(range.key)}
          onBlur={onDeactivate}
          className="rounded-[4px] px-0.5 text-inherit outline-none transition-[background-color,box-shadow] duration-150 [box-decoration-break:clone]"
          style={{
            backgroundColor: withAlpha(color, active ? 0.3 : 0.15),
            boxShadow: active ? `0 0 0 2px ${color}` : undefined,
          }}
        >
          {text.slice(range.start, range.end)}
        </mark>
        <span
          className="ml-1 whitespace-nowrap rounded px-1 py-px align-[1px] font-mono text-[9px] uppercase tracking-[0.08em]"
          style={{
            color: SEVERITY_TEXT_COLORS[tactic.severity],
            backgroundColor: withAlpha(color, 0.12),
          }}
        >
          {TACTIC_LABELS[tactic.type]}
        </span>
      </Fragment>,
    );
    cursor = range.end;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));

  return <p>{parts}</p>;
}
