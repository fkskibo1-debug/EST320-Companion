"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Fragment, useId, useState } from "react";
import { expert, type ExpertQuestion } from "@/data/expert";

const EXPAND = { duration: 0.35, ease: [0.4, 0, 0.2, 1] } as const;
const FADE = { duration: 0.15, ease: "easeOut" } as const;

function scrollParent(element: HTMLElement): HTMLElement | null {
  for (let node = element.parentElement; node; node = node.parentElement) {
    if (/(auto|scroll)/.test(getComputedStyle(node).overflowY)) return node;
  }
  return null;
}

// On mobile the open answer sits above the next tab, so collapsing it would
// yank the tapped tab out of view. Hold the tab at its viewport position instead.
function keepInPlace(element: HTMLElement, durationMs: number) {
  const scroller = scrollParent(element);
  const startTop = element.getBoundingClientRect().top;
  const end = performance.now() + durationMs;
  const step = () => {
    const drift = element.getBoundingClientRect().top - startTop;
    if (drift !== 0) (scroller ?? window).scrollBy(0, drift);
    if (performance.now() < end) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function AnswerCard({ item }: { item: ExpertQuestion }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-7 sm:p-8">
      <div className="max-w-[68ch] space-y-4 text-base leading-relaxed wrap-break-word">
        {item.answer.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default function ExpertInsights() {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const headingId = `${baseId}-heading`;
  const desktopPanelId = `${baseId}-panel`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const mobilePanelId = (index: number) => `${baseId}-panel-${index}`;

  const expand = reduceMotion ? { duration: 0 } : EXPAND;
  const fade = reduceMotion ? { duration: 0 } : FADE;
  const collapsed = reduceMotion ? undefined : { height: 0, opacity: 0 };

  const toggle = (index: number, button: HTMLButtonElement) => {
    const collapsesAbove = active !== null && active < index;
    setActive(active === index ? null : index);
    if (collapsesAbove && window.matchMedia("(max-width: 767px)").matches) {
      keepInPlace(button, reduceMotion ? 50 : EXPAND.duration * 1000 + 100);
    }
  };

  return (
    <section aria-labelledby={headingId} className="mt-16">
      <h2 id={headingId} className="label-mono text-muted">
        Expert Perspective
      </h2>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight">{expert.name}</h3>
      <p className="mt-2 leading-relaxed text-muted">
        {expert.roles.map((role) => (
          <span key={role} className="block">
            {role}
          </span>
        ))}
      </p>

      <div className="mt-6 grid md:grid-cols-2 md:gap-5">
        {expert.questions.map((item, index) => {
          const isActive = active === index;
          return (
            <Fragment key={item.label}>
              <button
                type="button"
                id={tabId(index)}
                aria-expanded={isActive}
                aria-controls={`${desktopPanelId} ${mobilePanelId(index)}`}
                onClick={(event) => toggle(index, event.currentTarget)}
                className={`flex h-full w-full scroll-mt-4 flex-col items-start rounded-2xl border bg-white p-7 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  index > 0 ? "mt-4 md:mt-0" : ""
                } ${isActive ? "border-ink/40 shadow-md" : "border-line hover:shadow-sm"}`}
              >
                <span className="flex w-full items-center justify-between gap-4">
                  <span className="label-mono text-muted">{item.label}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className={`size-4 shrink-0 text-ink transition-transform duration-300 motion-reduce:transition-none ${
                      isActive ? "rotate-45" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M8 2.5v11M2.5 8h11" />
                  </svg>
                </span>
                <span className="mt-4 text-xl leading-snug font-medium tracking-tight">
                  {item.question}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key={`mobile-${item.label}`}
                    id={mobilePanelId(index)}
                    role="region"
                    aria-labelledby={tabId(index)}
                    initial={collapsed ?? false}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={collapsed}
                    transition={expand}
                    className="overflow-hidden md:hidden"
                  >
                    <div className="pt-4">
                      <AnswerCard item={item} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Fragment>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {active !== null && (
          <motion.div
            key="desktop-panel"
            id={desktopPanelId}
            role="region"
            aria-labelledby={tabId(active)}
            initial={collapsed ?? false}
            animate={{ height: "auto", opacity: 1 }}
            exit={collapsed}
            transition={expand}
            className="hidden overflow-hidden md:block"
          >
            <div className="pt-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={fade}
                >
                  <AnswerCard item={expert.questions[active]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
