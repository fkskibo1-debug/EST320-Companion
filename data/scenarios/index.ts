import { breakup } from "./breakup";
import { nomi } from "./nomi";
import type { Scenario } from "./breakup";

export type { Message, Mode, Scenario, Severity, Tactic, TacticType } from "./breakup";
export { TACTIC_LABELS } from "./breakup";

export const scenarios: Scenario[] = [breakup, nomi];

export type UpcomingScenario = {
  title: string;
  description: string;
};

// Placeholder cards on the home page. Remove an entry once its scenario is added to `scenarios`.
export const upcomingScenarios: UpcomingScenario[] = [];

export function getScenario(slug: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.slug === slug);
}
