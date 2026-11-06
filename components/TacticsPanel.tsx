"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ActiveTactic } from "@/components/ScenarioView";
import TacticCard from "@/components/TacticCard";
import { tacticCardId, tacticKey } from "@/lib/highlights";
import type { AiMessage } from "@/lib/messages";

type Props = {
  aiName: string;
  message: AiMessage | undefined;
  isGreeting: boolean;
  active: ActiveTactic;
  onHoverTactic: (key: string | null) => void;
  className?: string;
};

export default function TacticsPanel({
  aiName,
  message,
  isGreeting,
  active,
  onHoverTactic,
  className = "",
}: Props) {
  const [open, setOpen] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const tactics = message?.tactics ?? [];
  const count = tactics.length;
  const countLabel = `${count} ${count === 1 ? "tactic" : "tactics"}`;

  useEffect(() => {
    if (!active || active.from !== "chat") return;
    const list = listRef.current;
    if (!list || list.scrollHeight <= list.clientHeight) return;
    const card = list.querySelector<HTMLElement>(`[data-tactic-key="${active.key}"]`);
    if (!card) return;

    const listBox = list.getBoundingClientRect();
    const cardBox = card.getBoundingClientRect();
    const behavior = reduceMotion ? "auto" : "smooth";
    if (cardBox.top < listBox.top) {
      list.scrollBy({ top: cardBox.top - listBox.top - 12, behavior });
    } else if (cardBox.bottom > listBox.bottom) {
      list.scrollBy({ top: cardBox.bottom - listBox.bottom + 12, behavior });
    }
  }, [active, reduceMotion]);

  let emptyText = "Select one of the AI's messages to see its tactics.";
  if (message) {
    emptyText = isGreeting
      ? "No tactics yet. This is a neutral greeting."
      : "No tactics flagged in this message.";
  }

  return (
    <section
      aria-labelledby="tactics-heading"
      className={`flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white ${className}`}
    >
      <h2 id="tactics-heading" className="border-b border-line">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="tactics-body"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink desk:hidden"
        >
          <span>
            What {aiName} just did ({count})
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className={`size-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
        <span className="hidden w-full items-baseline justify-between gap-4 px-6 py-4 desk:flex">
          <span className="font-semibold">What {aiName} just did</span>
          <span className="label-mono text-muted">{countLabel}</span>
        </span>
      </h2>

      <div
        id="tactics-body"
        ref={listRef}
        className={`${open ? "block" : "hidden"} min-h-0 flex-1 overflow-y-auto p-4 sm:p-5 desk:block`}
      >
        {count === 0 ? (
          <p className="rounded-xl border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
            {emptyText}
          </p>
        ) : (
          <motion.ul
            key={message?.id}
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="flex flex-col gap-3"
          >
            {message &&
              tactics.map((tactic, index) => {
                const key = tacticKey(message.id, index);
                return (
                  <TacticCard
                    key={key}
                    tactic={tactic}
                    tacticKey={key}
                    cardId={tacticCardId(message.id, index)}
                    active={active?.key === key}
                    onHover={onHoverTactic}
                  />
                );
              })}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
