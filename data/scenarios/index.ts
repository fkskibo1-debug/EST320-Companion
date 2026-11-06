import { breakup } from "./breakup";
import type { Scenario } from "./breakup";

export type { Message, Mode, Scenario, Severity, Tactic, TacticType } from "./breakup";
export { TACTIC_LABELS } from "./breakup";

export const scenarios: Scenario[] = [breakup];

export type UpcomingScenario = {
  title: string;
  description: string;
};

// Placeholder cards on the home page. Remove an entry once its scenario is added to `scenarios`.
export const upcomingScenarios: UpcomingScenario[] = [
  {
    title: "Everyday Use",
    description: "A user asks an AI assistant for help with their job hunt.",
  },
];

export function getScenario(slug: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.slug === slug);
}
