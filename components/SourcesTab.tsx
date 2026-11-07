"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { sources, type SourceRun } from "@/data/sources";

function SourceLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline decoration-ink/25 underline-offset-[3px] transition hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Citation({ runs }: { runs: SourceRun[] }) {
  return (
    <>
      {runs.map((run, index) => {
        if (run.type === "title") {
          return (
            <em key={index} className="italic">
              {run.value}
            </em>
          );
        }
        if (run.type === "url") {
          return (
            <SourceLink key={index} href={run.href}>
              {run.value}
            </SourceLink>
          );
        }
        return <span key={index}>{run.value}</span>;
      })}
    </>
  );
}

export default function SourcesTab() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const headingId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <footer className="z-20 shrink-0 border-t border-line bg-white">
      <AnimatePresence initial={false}>
        {open && (
          <motion.section
            key="sources-panel"
            id={panelId}
            aria-labelledby={headingId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-b border-line"
          >
            <div className="mx-auto max-h-[min(70vh,44rem)] max-w-4xl overflow-y-auto px-6 pt-6 pb-8 sm:px-10">
              <div className="flex items-baseline justify-between gap-4">
                <h2 id={headingId} className="text-xl font-semibold tracking-tight">
                  Works Cited
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-base text-muted underline-offset-4 transition hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Close
                </button>
              </div>
              <ul className="mt-6 flex list-none flex-col gap-5 p-0">
                {sources.map((runs) => (
                  <li
                    key={runs.map((run) => run.value).join("")}
                    className="ps-[0.5in] -indent-[0.5in] text-base leading-relaxed wrap-break-word"
                  >
                    <Citation runs={runs} />
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-center gap-2.5 py-3.5 font-mono text-[13px] leading-none tracking-[0.14em] text-ink uppercase transition hover:bg-page focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink"
      >
        Sources
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className={`size-4 transition-transform ${open ? "" : "rotate-180"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3.5 6.5 8 11l4.5-4.5" />
        </svg>
      </button>
    </footer>
  );
}
