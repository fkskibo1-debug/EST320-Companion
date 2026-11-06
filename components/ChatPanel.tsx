"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import MessageBubble from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import type { Message } from "@/data/scenarios";

type Props = {
  aiName: string;
  messages: Message[];
  typing: boolean;
  selectedId: string | null;
  activeKey: string | null;
  onSelect: (messageId: string) => void;
  onActivateTactic: (messageId: string, key: string) => void;
  onDeactivateTactic: () => void;
  children: ReactNode;
};

export default function ChatPanel({
  aiName,
  messages,
  typing,
  selectedId,
  activeKey,
  onSelect,
  onActivateTactic,
  onDeactivateTactic,
  children,
}: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTo({ top: list.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages.length, typing, reduceMotion]);

  return (
    <section
      aria-label={`Conversation with ${aiName}`}
      className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white"
    >
      <header className="flex items-center gap-3 border-b border-line px-5 py-4">
        <div
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-ink font-semibold text-white"
        >
          {aiName.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-semibold leading-tight">{aiName}</p>
          <p className="text-xs text-muted">AI assistant · demo script</p>
        </div>
      </header>

      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-label="Messages"
        className="flex max-h-[65vh] min-h-80 flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-5 desk:h-[min(62vh,640px)] desk:max-h-none"
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            aiName={aiName}
            selected={message.id === selectedId}
            activeKey={activeKey}
            onSelect={onSelect}
            onActivateTactic={onActivateTactic}
            onDeactivateTactic={onDeactivateTactic}
          />
        ))}
        {typing && <TypingIndicator aiName={aiName} />}
      </div>

      <div className="border-t border-line px-5 py-4">{children}</div>
    </section>
  );
}
