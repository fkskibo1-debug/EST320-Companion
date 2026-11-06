# Undertow

An interactive demo for EST 320 showing how an AI companion chatbot optimized for engagement can manipulate users. Visitors step through a scripted conversation, and a sidebar annotates the manipulation tactics the AI uses in each message. A "relationship drift" meter tracks the AI moving from Tool to Advisor to Confidant to Companion.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion. All content is static data in `data/scenarios/`. There is no database, CMS, or API.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Adding a new scenario

1. Copy `data/scenarios/breakup.ts` to a new file, for example `data/scenarios/everyday.ts`.
2. Replace the top of the file so it imports the shared types instead of redefining them:

   ```ts
   import type { Scenario } from "./breakup";

   export const everyday: Scenario = {
     slug: "everyday",
     // ...
   };
   ```

3. Fill in the same shape:
   - `slug` becomes the URL (`/scenario/everyday`).
   - `title`, `description`, `aiName`, and `disclaimer` appear on the home page card and the scenario page.
   - `messages` alternate between AI and user messages. AI messages have `paragraphs`, a `mode` (`tool`, `advisor`, `confidant`, or `companion`), a `drift` value from 0 (Tool) to 1 (Companion), and a list of `tactics`.
   - Each tactic's `quote` must be an exact substring of one paragraph in the same message. That phrase is highlighted in the chat. If a quote can't be found, the app logs a `console.warn` with the message id and skips the highlight.
   - `type` must be one of the keys in `TACTIC_LABELS` (in `breakup.ts`). To add a new tactic type, add it to `TacticType` and `TACTIC_LABELS` there.
4. Register it in `data/scenarios/index.ts`:

   ```ts
   import { everyday } from "./everyday";

   export const scenarios: Scenario[] = [breakup, everyday];
   ```

5. Remove the matching placeholder from `upcomingScenarios` in the same file so the "Coming soon" card goes away.

The scenario page is generated statically for every entry in `scenarios`, so no other changes are needed.

## Project layout

- `app/page.tsx`: home page with scenario cards.
- `app/scenario/[slug]/page.tsx`: statically generated scenario page.
- `components/`: `ScenarioView` (state), `DriftMeter`, `ChatPanel`, `MessageBubble`, `HighlightedParagraph`, `TacticsPanel`, `TacticCard`, `ReplyBar`, `TypingIndicator`.
- `lib/`: color helpers, quote matching, and message utilities.
- `data/scenarios/`: scenario content.

## Deploying

Push to a Git repository and import it in Vercel. No environment variables are required.
