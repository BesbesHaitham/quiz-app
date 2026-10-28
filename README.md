# QuizApp

A complete React Basics quiz in JavaScript and JSX. The interface follows the supplied three-panel reference: question navigator, question and answers, and a countdown with live statistics. It adapts the architecture, component APIs, theme conventions, and development tooling of `../todo-list/`. The original project is not modified.

## Get started

Use Node.js 22.12+ (or a newer supported LTS release), npm, and Java 17+ for WireMock.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. WireMock is optional: the first attempt loads the bundled quiz fixture if the API is unavailable or invalid. An existing saved attempt restores immediately without a network request.

Copy `.env.example` to `.env.local` to customize the API or quiz duration, then restart Vite:

```dotenv
VITE_API_BASE_URL=/api
VITE_API_PROXY_TARGET=http://127.0.0.1:8080
VITE_QUIZ_DURATION_SECONDS=600
```

The duration must be an integer between 1 and 86400 seconds. It applies when creating a new attempt; an existing attempt and its restarts keep their saved duration. To apply a different duration to an existing installation, finish the attempt and remove the `quiz-attempt:v1` entry in browser storage before reloading. Without an override, the quiz fixture controls the duration. `VITE_*` values are public configuration; never use them for secrets.

## Commands

| Command                   | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| `npm run dev`             | Start the Vite development server                    |
| `npm run start:mock`      | Start the npm WireMock CLI on port 8080              |
| `npm run build`           | Build the app into `dist/`                           |
| `npm run preview`         | Serve the production build locally                   |
| `npm run lint`            | Check JS/JSX using ESLint flat configuration         |
| `npm run format`          | Apply the reference project's Prettier rules         |
| `npm run format:check`    | Check formatting                                     |
| `npm run storybook`       | Start Storybook on port 6006                         |
| `npm run build-storybook` | Build the component library into `storybook-static/` |

## Architecture

```text
src/
  assets/                    Local brand SVG
  components/
    atoms/                   Button, IconButton, Input, Checkbox, Badge
    molecules/               AnswerOption, QuestionNavItem, CountdownTimer,
                             AnswerStatistics, Modal, QuestionReview
    organisms/               QuestionNavigator, QuestionCard, QuizSummary, QuizResults
    templates/               QuizLayout: header, responsive slots, save status
  pages/                     QuizPage: UI composition and finish confirmation
  routes/                    BrowserRouter routes and unknown-route redirect
  services/                  Native fetch helper, quiz retrieval and acknowledgement
  store/                     Quiz model, reducer, external store, quiz/theme hooks
  stories/                   All component stories and MDX documentation
  styles/                    Central design tokens and shared atom utilities
wiremock/
  __files/react-basics.json   Shared API/bundled fixture (10 questions)
  mappings/                  Static GET and POST stubs
.storybook/                  React/Vite framework, themed frame and addons
```

Every visual component has its own `.jsx` and `.module.css`. UI components receive data and callbacks; they do not call the API or write storage. `quizModel.js` owns validation, immutable transitions, timing, and derived statistics. `createQuizStore()` owns persistence, subscriptions, initialization, and mock acknowledgements. It accepts injected API, storage, clock, ID generator, and duration for isolated verification. `useQuiz()` connects React through `useSyncExternalStore` and manages timer and storage event subscriptions.

The generic atoms are copied from the reference project with their public APIs preserved, including native HTML attributes, events, React 19 refs, variants, five sizes, configurable radii, icons, loading states, and optional custom classes. Input supports native input/select/textarea, Checkbox supports indeterminate state, Badge supports removal, and IconButton supports accessible names and pressed state. Atom styles consume shared tokens rather than quiz-specific data.

## Quiz behavior and persistence

- Ten meaningful questions with four choices each. Choose or change an answer, use Previous/Next, or jump directly to any question. The initial attempt starts at question one with no prefilled answers.
- Progress counts answered questions. Correct, incorrect, and unanswered totals are derived from the answer map, so replacing an answer never double-counts it. As in the reference design, correctness is visible during the quiz.
- The countdown uses an absolute saved deadline, not a persisted decrementing counter. Time continues while the tab is closed or inactive. Refresh restores the same deadline; a restored expired attempt submits immediately.
- Every answer/navigation/finish action checks the deadline, including when a background tab has throttled timers. Automatic expiry closes the active quiz, including an open confirmation dialog, and records the deadline as the submission time.
- Finish opens a native confirmation dialog when questions are unanswered. Fully answered quizzes finish immediately. Results include score, percentage, time taken, counts, all four options, the chosen and correct answers, and an explanation for every question. Unanswered questions earn no points.
- Restart creates a fresh attempt with a new ID and deadline, clears answers, and returns to question one. Completed results survive refresh and cannot be edited.
- The versioned localStorage envelope is `{ version: 1, attempt }` under `quiz-attempt:v1`. It stores the quiz snapshot, answer map, current index, timestamps, duration, submission reason, and status. Scores are recomputed from the saved answers and quiz, avoiding stale duplicated totals. The quiz snapshot keeps a restored attempt consistent even if the API fixture changes.
- Validation rejects malformed quizzes, duplicate IDs, invalid option indices, inconsistent deadlines, invalid completion states, and incompatible storage versions. Unreadable saved data starts a fresh attempt with a notice. Blocked/full storage leaves the app usable in memory and displays a warning. Storage events synchronize valid saved attempts between open tabs; concurrent edits are last-write-wins, not collaborative merging.
- Theme follows the reference hook pattern: initialize from `quiz-theme`, fall back to the OS preference, set `data-theme`, and persist changes. A small initial HTML script avoids a theme flash. Theme switching also works if storage is blocked.

This is a local practice quiz. The answer key is bundled and the timer uses the device clock; it is not a secure examination or server-backed assessment system. Clearing site storage removes the saved attempt. No account or remote result history is created.

## WireMock

In a second terminal:

```sh
npm run start:mock
```

This uses the exact reference CLI setup: `wiremock --root-dir ./wiremock --port 8080 --enable-stub-cors`. The npm package includes the standalone WireMock JAR and runs it with Java; Docker is not used.

| Endpoint                        | Behavior                                                        |
| ------------------------------- | --------------------------------------------------------------- |
| `GET /api/quizzes/react-basics` | Serves `wiremock/__files/react-basics.json`                     |
| `POST /api/quiz-submissions`    | Returns a static `202` acknowledgement; stores nothing remotely |

Vite proxies `/api` in both dev and preview to `VITE_API_PROXY_TARGET`. The reusable service uses native `fetch`, validates GET responses, checks HTTP status, and times out after 1.8 seconds. On initial API failure it uses the same bundled JSON fixture. On submission, results are persisted locally before the best-effort POST; an unavailable mock never discards or replaces them. Static endpoints do not act as a dynamic database, and offline submissions are not queued for later replay.

For deployment, configure the host to serve `index.html` for browser routes. Vite's proxy is only for local dev/preview; a deployed API needs a same-origin reverse proxy or an appropriate public API base URL with CORS. The bundled fixture still supports a static deployment without an API.

## Design system, Storybook, and accessibility

`src/styles/tokens.css` centralizes light/dark colors, spacing, typography, control sizes, shadows, radii, and motion. Desktop uses three columns, tablet places the navigator alongside the question with the summary below, and mobile stacks the cards with a horizontally scrollable numbered question strip. All ten questions remain reachable at 320px. No external fonts or image services are needed.

Storybook matches the reference React/Vite configuration and addons: Docs, A11y, Chromatic, and MCP. Stories live only in `src/stories/`, cover all atoms and quiz components, include interactive answer/navigation examples, and use a light/dark toolbar. The complete layout story runs inside MemoryRouter and does not touch application storage. MDX provides setup and atom prop documentation. Chromatic is installed for parity; no upload or external publication is configured.

Answers use native radios with arrow-key and Space selection. The question navigator exposes current-step and answer-status labels. Navigation moves focus to the new question heading. A skip link, visible focus indicators, native modal focus trapping/restoration, labelled progress bar, reduced-motion support, and a screen-reader-friendly timer are included. The timer does not announce every second; it announces the final-minute warning once.

## Verification

Required project checks:

```sh
npm run lint
npm run format:check
npm run build
npm run build-storybook
```

Functional verification checklist:

1. Start without WireMock: verify the fixture loads, question one is unanswered, and all 10 questions are available.
2. Select and change answers; navigate using Next, Previous, and numbered questions. Confirm retained selections and totals summing to 10.
3. Refresh mid-quiz: verify answers, active question, and original countdown deadline remain. Toggle theme and refresh again.
4. Finish with unanswered questions: cancel using Keep going, Escape, or the close button; then confirm. Verify counts, percentage, review labels, and explanations.
5. Refresh results, then restart: verify a new attempt, cleared answers, question one, and a full timer.
6. Set a short duration on a fresh installation: verify automatic submission, including after refresh, in an inactive tab, and while the confirmation is open.
7. Try corrupt/old-version storage and blocked storage; verify recovery or a session-only warning.
8. Run WireMock and verify both endpoints, then stop it and confirm local persistence still works.
9. Inspect desktop, tablet, 390px, and 320px layouts in both themes. Verify radio keyboard navigation, visible focus, no page-wide horizontal overflow, and accessible dialog behavior.
10. In Storybook, inspect the full-layout and results stories, update controls, toggle themes, and use the Accessibility panel.

No automated testing framework, drag-and-drop libraries, Redux, Axios, TypeScript source, or Docker configuration is added. The lockfile, source, fixtures, mappings, and configuration remain trackable; dependencies, build output, caches, and local environment files are ignored.
