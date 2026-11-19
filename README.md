# Yoan Hernalesteen — Portfolio

Personal portfolio of a product-minded developer: after years as a game designer, I now design and build web products.
The site presents case studies that show how I work: the problem, my decisions and the results.

**Live site:** [yoanhernalesteen.com](https://yoanhernalesteen.com)

## Stack

| Area          | Choice                                                             |
| ------------- | ------------------------------------------------------------------ |
| UI            | React 19, TypeScript (`strict`)                                    |
| Routing/build | React Router 8 (framework mode) + Vite, static prerendering        |
| Content       | MDX for case study text, typed TypeScript for metadata             |
| Styling       | Tailwind CSS 4, light and dark themes, self-hosted fonts           |
| Icons         | Font Awesome (free solid icons)                                    |
| Tests         | Vitest, Testing Library, jsdom                                     |
| Quality       | ESLint (typescript-eslint, react-hooks), Prettier                  |
| CI/CD         | GitHub Actions: typecheck, lint, format, tests, build, then deploy |
| Hosting       | GitHub Pages, custom domain                                        |

## Technical choices

**React without a heavy framework.** I already use Next.js on another project
([The Rolistes](https://rolistespod.com)) and Ruby on Rails daily. This site
shows React and TypeScript on their own: routing, components, state, build.

**Prerendering instead of a single-page app.** With `ssr: false` and
`prerender` in [`react-router.config.ts`](react-router.config.ts), the build
writes one HTML file per page, including each case study. Each page has its
own title and preview when shared on LinkedIn, deep links work on a static
host, and content is visible before JavaScript loads. After the first load,
the site behaves like a regular React app.

**Metadata in TypeScript, text in MDX.** Case study metadata (title, summary,
tracks) lives in [`app/content/cases.ts`](app/content/cases.ts), checked by
the compiler. The long-form text lives in
`app/content/cases/<lang>/<slug>.mdx`. A test makes sure every case has
exactly one MDX file.

**One switch for positioning.** `FOCUS` in
[`app/content/positioning.ts`](app/content/positioning.ts) sets the angle of
the site (`"dev-produit"` or `"po"`): role, headline, highlighted CV, skills
and the order of case studies. TypeScript requires every text for every
angle, so switching is a one-line change.

**Typed translations.** UI text lives in a typed dictionary
([`app/i18n/`](app/i18n/)). Adding `"en"` to the `Lang` type makes the
compiler point at every missing translation.

**No third-party requests by default.** Fonts (Inter, Space Grotesk,
JetBrains Mono) are bundled with the site instead of loaded from Google
Fonts: better for privacy (GDPR) and for performance. YouTube videos show a
local thumbnail and only load the `youtube-nocookie.com` player when the
visitor clicks play ([`YouTubeVideo`](app/components/YouTubeVideo.tsx)).

**Drafts stay out of the build.** Unfinished case studies live in
[`app/content/caseDrafts.ts`](app/content/caseDrafts.ts) and
`app/content/cases/brouillons/`. No page imports them, and a test checks that
their text is never bundled.

**Deploy on every push to `main`.** The `deploy` job in
[`.github/workflows/ci.yml`](.github/workflows/ci.yml) only runs after all
checks pass, and only has the permissions it needs to publish to Pages.

## Getting started

Requirements: Node.js 24 (see [`.nvmrc`](.nvmrc)).

```bash
nvm use
npm ci
npm run dev      # http://localhost:5173
```

## Scripts

| Command             | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                 |
| `npm run build`     | Prerendered static site in `build/client/`         |
| `npm test`          | Run the tests once (`npm run test:watch` to watch) |
| `npm run typecheck` | Generate route types, then run `tsc`               |
| `npm run lint`      | ESLint                                             |
| `npm run format`    | Format with Prettier (`format:check` to check)     |

## Project structure

```
app/
  assets/       Images: case study screenshots, logos, game visuals (WebP)
  components/   Reusable UI (header, case cards, filter, article, video…)
  content/      Site data: positioning, case studies (TS + MDX), career, links
  i18n/         Typed dictionaries
  routes/       One file per page, plus sitemap.xml and robots.txt
  root.tsx      Shared layout and error page
  routes.ts     Route definitions
  seo.ts        Page titles, descriptions and canonical links
  theme.ts      Light and dark themes, saved choice
```

## Adding a case study

1. Add an entry to `cases` in [`app/content/cases.ts`](app/content/cases.ts).
2. Create `app/content/cases/fr/<slug>.mdx` with the text.
3. Put its images in `app/assets/cases/<slug>/` (WebP), and import them in
   the MDX file with a relative path.
4. Run `npm test`: it fails if the entry and the MDX file do not match.

The page is prerendered automatically at build time. To keep a case
unpublished, add it to `caseDrafts.ts` and put its text in
`app/content/cases/brouillons/` instead.
