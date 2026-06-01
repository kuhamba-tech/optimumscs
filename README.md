# Optimum SCS React + Vite Project

## Stack
- React
- Vite
- React Router
- Plain CSS

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Routes
- /
- /solutions
- /industries
- /about
- /case-studies
- /contact
- /fee-quote

## Notes
- Uses one consistent container width
- Shared navbar and footer across all pages
- Pure CSS glassmorphism styling
- Decorative non-text background only

## Deploy (Vercel)

- **Production:** [https://optimumscs.vercel.app/](https://optimumscs.vercel.app/)
- **Test:** [https://optimumscs-gamma.vercel.app/](https://optimumscs-gamma.vercel.app/)

Connect the Vercel project **optimumscs** to `kuhamba-tech/optimumscs` on branch `main`, copy env vars from gamma, then every `git push` updates production. Full steps: **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

## AskOptimumSCS (AI widget)
- Dev: set `ANTHROPIC_API_KEY` in `.env` (see `.env.example`). Run `npm run dev` → `http://localhost:5173`.
- **Vercel:** `ANTHROPIC_API_KEY` + `WEB3FORMS_ACCESS_KEY` in project Environment Variables (see [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md)).
- API route: `POST /api/ask-optimum` (serverless; key never exposed to the browser).
- Without the env var, the widget falls back to guided recommendations.
