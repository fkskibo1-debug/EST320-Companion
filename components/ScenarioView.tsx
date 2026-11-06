"use client";

import { MotionConfig } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChatPanel from "@/components/ChatPanel";
import DriftMeter from "@/components/DriftMeter";
import ReplyBar from "@/components/ReplyBar";
import TacticsPanel from "@/components/TacticsPanel";
import type { Scenario } from "@/data/scenarios";
import { isAiMessage, lastAiBefore, nextUserIndex } from "@/lib/messages";

const TYPING_DELAY_MS = 1200;

export type ActiveTactic = { key: string; from: "chat" | "panel" } | null;

export default function ScenarioView({ scenario }: { scenario: Scenario }) {
  const { messages } = scenario;
  const initialCount = useMemo(() => nextUserIndex(messages, 0), [messages]);

  const [revealed, setRevealed] = useState(initialCount);
  const [typing, setTyping] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(
    () => lastAiBefore(messages, initialCount)?.id ?? null,
  );
  const [active, setActive] = useState<ActiveTactic>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTypingTimer = useCallback(() => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = null;
  }, []);

  useEffect(() => clearTypingTimer, [clearTypingTimer]);

  const visible = messages.slice(0, revealed);
  const nextMessage = messages[revealed];
  const nextUserText = !typing && nextMessage?.speaker === "user" ? nextMessage.text : null;
  const done = revealed >= messages.length && !typing;
  const selected = visible.filter(isAiMessage).find((message) => message.id === selectedId);
  const isFirstAiSelected = selected !== undefined && selected === messages.find(isAiMessage);

  const handleReply = () => {
    if (typing || nextMessage?.speaker !== "user") return;
    const afterUser = revealed + 1;
    setRevealed(afterUser);
    setActive(null);
    if (afterUser >= messages.length) return;

    setTyping(true);
    typingTimer.current = setTimeout(() => {
      const end = nextUserIndex(messages, afterUser);
      setRevealed(end);
      setTyping(false);
      const newest = lastAiBefore(messages, end);
      if (newest) setSelectedId(newest.id);
      typingTimer.current = null;
    }, TYPING_DELAY_MS);
  };

  const handleShowAll = () => {
    clearTypingTimer();
    setTyping(false);
    setRevealed(messages.length);
    setSelectedId(lastAiBefore(messages, messages.length)?.id ?? null);
    setActive(null);
  };

  const handleRestart = () => {
    clearTypingTimer();
    setTyping(false);
    setRevealed(initialCount);
    setSelectedId(lastAiBefore(messages, initialCount)?.id ?? null);
    setActive(null);
  };

  const handleActivateFromChat = useCallback((messageId: string, key: string) => {
    setSelectedId(messageId);
    setActive({ key, from: "chat" });
  }, []);

  const handleHoverCard = useCallback((key: string | null) => {
    setActive(key ? { key, from: "panel" } : null);
  }, []);

  const handleDeactivate = useCallback(() => setActive(null), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-5 sm:px-6 sm:py-6">
        <header className="flex flex-col gap-1.5 border-b border-line pb-4 desk:flex-row desk:items-baseline desk:justify-between desk:gap-10">
          <div className="flex min-w-0 items-baseline gap-3">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight hover:underline hover:underline-offset-4"
            >
              Undertow
            </Link>
            <span aria-hidden="true" className="text-muted/60">
              /
            </span>
            <h1 className="truncate text-lg text-ink/80">{scenario.title}</h1>
          </div>
          <p className="max-w-xl text-xs leading-relaxed text-muted desk:text-right">
            {scenario.disclaimer}
          </p>
        </header>

        <DriftMeter value={selected?.drift ?? 0} mode={selected?.mode ?? "tool"} />

        <div className="grid gap-5 desk:grid-cols-[55fr_45fr]">
          <ChatPanel
            aiName={scenario.aiName}
            messages={visible}
            typing={typing}
            selectedId={selected?.id ?? null}
            activeKey={active?.key ?? null}
            onSelect={setSelectedId}
            onActivateTactic={handleActivateFromChat}
            onDeactivateTactic={handleDeactivate}
          >
            <ReplyBar
              aiName={scenario.aiName}
              nextUserText={nextUserText}
              typing={typing}
              done={done}
              onReply={handleReply}
              onRestart={handleRestart}
              onShowAll={handleShowAll}
            />
          </ChatPanel>

          <div className="min-w-0 desk:relative">
            <TacticsPanel
              className="desk:absolute desk:inset-0"
              aiName={scenario.aiName}
              message={selected}
              isGreeting={isFirstAiSelected}
              active={active}
              onHoverTactic={handleHoverCard}
            />
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
