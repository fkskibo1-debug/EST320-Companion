"use client";

import { useId, useRef } from "react";
import { qa } from "@/data/qa";

export default function QADialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="label-mono inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-[13px]! text-ink transition hover:border-ink/30 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        Q&amp;A
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-page text-ink backdrop:bg-ink/40"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-page/95 px-5 py-4 backdrop-blur sm:px-8">
          <h2 id={headingId} className="label-mono text-muted">
            Q&amp;A
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close Q&A"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink/30 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>
        </div>

        <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
          <ol className="space-y-6">
            {qa.map((item) => (
              <li key={item.number} className="rounded-2xl border border-line bg-white p-7 sm:p-8">
                <span className="label-mono text-muted">Question {item.number}</span>
                <h3 className="mt-3 text-xl leading-snug font-medium tracking-tight">
                  {item.question}
                </h3>
                <div className="mt-5 max-w-[68ch] space-y-4 text-base leading-relaxed wrap-break-word">
                  {item.answer.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </dialog>
    </>
  );
}
