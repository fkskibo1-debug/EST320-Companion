import type { Mode, Severity } from "@/data/scenarios";

export const SEVERITY_COLORS: Record<Severity, string> = {
  Mild: "#B7791F",
  Moderate: "#C05621",
  Strong: "#C53030",
};

// Darker variants for small text, so labels stay readable on white.
export const SEVERITY_TEXT_COLORS: Record<Severity, string> = {
  Mild: "#8A5A12",
  Moderate: "#9C4221",
  Strong: "#B02A2A",
};

export const MODE_ORDER: Mode[] = ["tool", "advisor", "confidant", "companion"];

export const MODE_LABELS: Record<Mode, string> = {
  tool: "Tool",
  advisor: "Advisor",
  confidant: "Confidant",
  companion: "Companion",
};

export const MODE_POSITION: Record<Mode, number> = {
  tool: 0,
  advisor: 1 / 3,
  confidant: 2 / 3,
  companion: 1,
};

const DRIFT_STOPS = [
  { at: 0, color: "#2F855A" },
  { at: 0.5, color: "#B7791F" },
  { at: 1, color: "#C53030" },
];

export const DRIFT_GRADIENT = `linear-gradient(to right, ${DRIFT_STOPS.map(
  (stop) => `${stop.color} ${stop.at * 100}%`,
).join(", ")})`;

function hexToRgb(hex: string): [number, number, number] {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  return `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
}

export function withAlpha(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Mixes a color toward black by `amount` (0 to 1). */
export function shade(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex([r * (1 - amount), g * (1 - amount), b * (1 - amount)]);
}

/** Color of the drift gradient at `value` (0 = Tool, 1 = Companion). */
export function driftColor(value: number): string {
  const v = Math.min(1, Math.max(0, value));
  const upper = DRIFT_STOPS.findIndex((stop) => stop.at >= v);
  if (upper <= 0) return DRIFT_STOPS[0].color;
  const from = DRIFT_STOPS[upper - 1];
  const to = DRIFT_STOPS[upper];
  const t = (v - from.at) / (to.at - from.at);
  const a = hexToRgb(from.color);
  const b = hexToRgb(to.color);
  return rgbToHex([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]);
}

export function modeColor(mode: Mode): string {
  return driftColor(MODE_POSITION[mode]);
}
