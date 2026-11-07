import Link from "next/link";
import ExpertInsights from "@/components/ExpertInsights";
import QADialog from "@/components/QADialog";
import { scenarios, upcomingScenarios } from "@/data/scenarios";

const WALKTHROUGH_URL =
  "https://stonybrook.zoom.us/rec/share/wd7aWv_AjSOdkIkV7cYuGEV38kuBm3eJo1SXSrfvymc1VqoimYk6zf0mNN3NzCRt.MySGvbFDIYPBspED";
const WALKTHROUGH_PASSCODE = "U6d?0wr5";

export default function Home() {
  return (
    <main className="relative mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="absolute top-4 right-5 flex flex-col items-end gap-1.5 sm:top-6 sm:right-8">
        <div className="flex items-center gap-2">
          <QADialog />
          <a
            href={WALKTHROUGH_URL}
            target="_blank"
            rel="noreferrer"
            className="label-mono inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-[13px]! text-ink transition hover:border-ink/30 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="currentColor">
              <path d="M4.5 2.75v10.5L13 8 4.5 2.75Z" />
            </svg>
            Watch walkthrough
            <span className="sr-only"> (Zoom recording, opens in a new tab)</span>
          </a>
        </div>
        <p className="font-mono text-xs text-muted">
          Passcode: <span className="text-ink select-all">{WALKTHROUGH_PASSCODE}</span>
        </p>
      </div>

      <p className="label-mono text-muted">EST 320 · Class project</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">Undertow</h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        How engagement-optimized AI companions pull users in, one message at a time.
      </p>
      <p className="mt-4 text-sm text-muted">By Frank, Effy, Vicky, Vicki, and Ryan</p>

      <section aria-labelledby="scenarios-heading" className="mt-14">
        <h2 id="scenarios-heading" className="label-mono text-muted">
          Scenarios
        </h2>
        <ul className="mt-4 grid gap-5 sm:grid-cols-2">
          {scenarios.map((scenario, index) => (
            <li key={scenario.slug}>
              <Link
                href={`/scenario/${scenario.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition hover:border-ink/30 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="label-mono text-muted">Scenario {index + 1}</span>
                  <span className="label-mono rounded-full bg-page px-2.5 py-1 text-ink">
                    AI: {scenario.aiName}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">{scenario.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{scenario.description}</p>
                <span className="label-mono mt-auto pt-6 text-ink group-hover:underline group-hover:underline-offset-4">
                  Start scenario →
                </span>
              </Link>
            </li>
          ))}

          {upcomingScenarios.map((upcoming) => (
            <li
              key={upcoming.title}
              className="flex h-full flex-col rounded-2xl border border-dashed border-line bg-white/50 p-7 text-muted"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="label-mono">Scenario {scenarios.length + 1}</span>
                <span className="label-mono rounded-full border border-line px-2.5 py-1">
                  Coming soon
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{upcoming.title}</h3>
              <p className="mt-2 leading-relaxed">{upcoming.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <ExpertInsights />
    </main>
  );
}
