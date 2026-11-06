"use client";

import { motion } from "framer-motion";
import { useMemo, type KeyboardEvent } from "react";
import HighlightedParagraph from "@/components/HighlightedParagraph";
import type { Message } from "@/data/scenarios";
import { locateTactics } from "@/lib/highlights";
import type { AiMessage } from "@/lib/messages";
import { MODE_LABELS, modeColor, shade, withAlpha } from "@/lib/theme";

type Props = {
  message: Message;
  aiName: string;
  selected: boolean;
  activeKey: string | null;
  onSelect: (messageId: string) => void;
  onActivateTactic: (messageId: string, key: string) => void;
  onDeactivateTactic: () => void;
};

const enter = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
} as const;

export default function MessageBubble(props: Props) {
  const { message } = props;

  if (message.speaker === "user") {
    return (
      <motion.div {...enter} className="flex justify-end">
        <div
          tabIndex={0}
          className="max-w-[85%] break-words rounded-[18px] rounded-br-md bg-ink px-4 py-3 text-[15px] leading-relaxed text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <span className="sr-only">You said: </span>
          {message.text}
        </div>
      </motion.div>
    );
  }

  return <AiBubble {...props} message={message} />;
}

function AiBubble({
  message,
  aiName,
  selected,
  activeKey,
  onSelect,
  onActivateTactic,
  onDeactivateTactic,
}: Props & { message: AiMessage }) {
  const rangesByParagraph = useMemo(() => locateTactics(message), [message]);
  const color = modeColor(message.mode);
  const tacticCount = message.tactics.length;

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(message.id);
    }
  };

  return (
    <motion.div {...enter} className="flex justify-start">
      <article
        tabIndex={0}
        aria-current={selected ? "true" : undefined}
        onClick={() => onSelect(message.id)}
        onKeyDown={handleKeyDown}
        className={`max-w-[90%] cursor-pointer break-words rounded-[18px] rounded-bl-md bg-bubble-ai px-4 py-3.5 text-[15px] leading-relaxed text-ink transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
          selected ? "shadow-[0_0_0_2px_rgba(22,35,43,0.28)]" : "hover:shadow-[0_0_0_1px_rgba(22,35,43,0.18)]"
        }`}
      >
        <span className="sr-only">
          {aiName} said{selected ? " (selected)" : ""}:{" "}
        </span>
        <div className="space-y-3">
          {message.paragraphs.map((text, index) => (
            <HighlightedParagraph
              key={index}
              text={text}
              ranges={rangesByParagraph[index]}
              activeKey={activeKey}
              linkToCards={selected}
              onActivate={(key) => onActivateTactic(message.id, key)}
              onDeactivate={onDeactivateTactic}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]"
            style={{
              color: shade(color, 0.25),
              backgroundColor: withAlpha(color, 0.12),
              boxShadow: `inset 0 0 0 1px ${withAlpha(color, 0.35)}`,
            }}
          >
            <span aria-hidden="true" className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
            {MODE_LABELS[message.mode]} mode
          </span>
          {tacticCount > 0 && !selected && (
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              {tacticCount} {tacticCount === 1 ? "tactic" : "tactics"} · click to inspect
            </span>
          )}
        </div>
      </article>
    </motion.div>
  );
}
