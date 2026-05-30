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

## AskOptimumSCS (AI widget)
- Dev: set `ANTHROPIC_API_KEY` in `.env` (see `.env.example`). Run `npm run dev` → `http://localhost:5173`.
- **Vercel** ([optimumscs-gamma.vercel.app](https://optimumscs-gamma.vercel.app/)): Project → Settings → Environment Variables → add `ANTHROPIC_API_KEY` for Production (and Preview), then redeploy.
- API route: `POST /api/ask-optimum` (serverless; key never exposed to the browser).
- Without the env var, the widget falls back to guided recommendations.
