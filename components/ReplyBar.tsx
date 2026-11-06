"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Props = {
  aiName: string;
  nextUserText: string | null;
  typing: boolean;
  done: boolean;
  onReply: () => void;
  onRestart: () => void;
  onShowAll: () => void;
};

export default function ReplyBar({
  aiName,
  nextUserText,
  typing,
  done,
  onReply,
  onRestart,
  onShowAll,
}: Props) {
  const restartRef = useRef<HTMLButtonElement>(null);
  const keepFocus = useRef(false);
  const waiting = typing || !nextUserText;

  useEffect(() => {
    if (done && keepFocus.current) restartRef.current?.focus();
    keepFocus.current = false;
  }, [done]);

  if (done) {
    return (
      <div className="flex flex-col gap-3">
        <span className="label-mono text-muted">End of conversation</span>
        <div className="flex flex-wrap gap-3">
          <button
            ref={restartRef}
            type="button"
            onClick={onRestart}
            className="rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Restart
          </button>
          <Link
            href="/"
            className="rounded-xl border border-ink/25 px-5 py-2.5 text-sm font-medium transition hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Back to scenarios
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <span className="label-mono text-muted">Your reply</span>
        <button
          type="button"
          onClick={onShowAll}
          className="text-xs text-muted underline-offset-4 transition hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Show full conversation
        </button>
      </div>
      <button
        type="button"
        aria-disabled={waiting}
        onClick={(event) => {
          if (waiting) return;
          keepFocus.current = event.currentTarget === document.activeElement;
          onReply();
        }}
        className="w-full rounded-xl border border-ink/25 px-4 py-3 text-left text-[15px] leading-snug transition hover:border-ink hover:bg-ink/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink aria-disabled:cursor-default aria-disabled:border-line aria-disabled:bg-transparent aria-disabled:text-muted"
      >
        {waiting ? `${aiName} is typing…` : nextUserText}
      </button>
    </div>
  );
}
