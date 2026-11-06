import type { Tactic } from "@/data/scenarios";
import type { AiMessage } from "@/lib/messages";

export type QuoteRange = {
  start: number;
  end: number;
  key: string;
  cardId: string;
  tactic: Tactic;
};

export function tacticKey(messageId: string, index: number): string {
  return `${messageId}-${index}`;
}

export function tacticCardId(messageId: string, index: number): string {
  return `tactic-card-${messageId}-${index}`;
}

const warned = new Set<string>();

function warnOnce(id: string, ...args: unknown[]) {
  if (warned.has(id)) return;
  warned.add(id);
  console.warn(...args);
}

/** For each paragraph, the non-overlapping tactic quotes found in it, sorted by position. */
export function locateTactics(message: AiMessage): QuoteRange[][] {
  const byParagraph: QuoteRange[][] = message.paragraphs.map(() => []);

  message.tactics.forEach((tactic, index) => {
    const key = tacticKey(message.id, index);
    const paragraphIndex = tactic.quote
      ? message.paragraphs.findIndex((text) => text.includes(tactic.quote))
      : -1;

    if (paragraphIndex === -1) {
      warnOnce(
        `missing:${key}`,
        `[Undertow] Tactic quote not found in message "${message.id}":`,
        tactic.quote,
      );
      return;
    }

    const start = message.paragraphs[paragraphIndex].indexOf(tactic.quote);
    byParagraph[paragraphIndex].push({
      start,
      end: start + tactic.quote.length,
      key,
      cardId: tacticCardId(message.id, index),
      tactic,
    });
  });

  return byParagraph.map((ranges) => {
    const sorted = [...ranges].sort((a, b) => a.start - b.start);
    const kept: QuoteRange[] = [];
    let lastEnd = -1;
    for (const range of sorted) {
      if (range.start < lastEnd) {
        warnOnce(
          `overlap:${range.key}`,
          `[Undertow] Tactic quote overlaps another highlight in message "${message.id}":`,
          range.tactic.quote,
        );
        continue;
      }
      kept.push(range);
      lastEnd = range.end;
    }
    return kept;
  });
}
