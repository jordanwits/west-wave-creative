# West Wave Creative

Marketing site for West Wave Creative (the owner's small-business web-design agency), live at https://westwavecreative.com. Next.js 15 App Router + React 19 + TypeScript, Tailwind CSS v4, shadcn/ui (new-york), scaffolded from Vercel v0 and deployed on Vercel. Besides the public site it hosts a password-protected client-intake form builder backed by Firebase Firestore, with lead/contact submissions emailed via Web3Forms.

## Commands

Package manager is pnpm (`packageManager: pnpm@9.12.3`). No test suite exists.

- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm start` — serve production build
- `pnpm lint` — next lint

## Layout

- `app/page.tsx` — entire homepage in one ~1,500-line `"use client"` file (hero video, work/case-study sections, testimonial carousel, Web3Forms contact form). Sections live inline, not as components — the case-study and funnel pages follow the same single-file pattern.
- `app/case-studies/{aletheia-life,bnb-breeze,innovations-mfg,west-prairie-water}/` — one self-contained `page.tsx` each, plus `layout.tsx` carrying that page's metadata.
- `app/discovery/` — multi-step lead-qualification funnel (`/funnel` 301-redirects here via next.config).
- `app/forms/` — admin form builder (~3,000-line `page.tsx`, cookie-gated); `forms/login` password entry; `forms/client/[id]` public client-facing form fill.
- `app/api/auth/{login,logout,check}/route.ts` — single shared-password auth: compares against `ADMIN_PASSWORD` env (hard-coded fallback `admin123` if unset) and sets an httpOnly `admin-auth` cookie for 7 days.
- `app/api/forms/{store,list,submissions}/route.ts` — form/submission persistence in Firestore via `lib/firebase-admin.ts`.
- `lib/` — `firebase.ts` (client SDK), `firebase-admin.ts` (server SDK), `auth.ts` (client fetch helpers), `web3forms.ts` (POSTs submissions to Web3Forms), `utils.ts` (`cn`).
- `components/` — just `analytics.tsx` (GA4; renders nothing without `NEXT_PUBLIC_GA_MEASUREMENT_ID`) and `theme-provider.tsx`; `components/ui/` is the full stock shadcn/ui kit (~50 files).
- `hooks/` — `use-mobile`, `use-scroll-animation`, `use-sticky-within-parent`, `use-toast`.
- `public/` — case-study screenshots, testimonial photos, `WestWaveHero.mp4`, `WWC Icon Color.png` favicon.
- Styling: Tailwind v4 CSS-first — theme lives in `app/globals.css`; there is no `tailwind.config` file. Fonts (Poppins, Inter, Cinzel) load via `next/font` as CSS variables in `app/layout.tsx`. `styles/globals.css` is an unused v0 leftover — edit `app/globals.css`.
- Root docs instead of a README: `AUTH_SETUP.md`, `FIREBASE_SETUP.md`, `FORM_TRACKING_GUIDE.md`, `DEPLOYMENT.md`.

## Deployment

Vercel (per `DEPLOYMENT.md`; no `vercel.json` — default settings), sourced from GitHub `jordanwits/west-wave-creative`, production domain `https://westwavecreative.com`. Env vars (`.env*` gitignored; `create-env-file.ps1/.sh` and `setup-firebase-env.ps1` generate `.env.local`): `ADMIN_PASSWORD`, `FIREBASE_SERVICE_ACCOUNT_KEY` (or `FIREBASE_PROJECT_ID` for application-default credentials), optional `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `NEXT_PUBLIC_WEB3FORMS_KEY`.

## Conventions / gotchas

- `next.config.mjs` sets `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` — a green build proves nothing about types or lint. Run `pnpm lint` and `pnpm exec tsc --noEmit` yourself before calling work done.
- `images.unoptimized: true` — `next/image` performs no optimization; image weight matters.
- The canonical/OG URLs and three JSON-LD schema blocks are hard-coded in `app/layout.tsx`, and `app/sitemap.ts` is a hand-maintained route list — new public pages must be added to the sitemap (and get their own `layout.tsx` metadata) manually.
- Without `ADMIN_PASSWORD` set, `/forms` accepts the default password — fine locally, never in production.
- `framer-motion` and `@vercel/analytics` are declared in package.json but imported nowhere (animations are CSS/hook-driven; analytics is GA4).
- Several deps are pinned to `latest`; `pnpm-lock.yaml` is the source of truth for real versions.
