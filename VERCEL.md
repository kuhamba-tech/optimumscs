# Vercel deployment — AskOptimumSCS live AI

Sites:

- **Production domain:** [https://optimumscs.vercel.app/](https://optimumscs.vercel.app/) — connect project `optimumscs` to this repo (see [UPDATE_OPTIMUMSCS_VERCEL.md](./UPDATE_OPTIMUMSCS_VERCEL.md))
- **Preview / test:** [https://optimumscs-gamma.vercel.app/](https://optimumscs-gamma.vercel.app/)

## 1. Environment variables (required)

In [Vercel Dashboard](https://vercel.com) → your project → **Settings** → **Environment Variables**:

| Name | Used for | Environments |
|------|----------|----------------|
| `ANTHROPIC_API_KEY` | AskOptimumSCS live AI (`/api/ask-optimum`) | Production, Preview |
| `WEB3FORMS_ACCESS_KEY` | Fee Quote, Book Consultation, Contact forms (`/api/submit-form`) — your **fee quote** access key from Web3Forms | Production, Preview |

You can use the same value as your Web3Forms access key from [web3forms.com](https://web3forms.com).

`VITE_WEB3FORMS_KEY` in the dashboard also works as a fallback for `/api/submit-form`, but **`WEB3FORMS_ACCESS_KEY` is preferred** (never exposed in the browser).

Do **not** rely on `VITE_ANTHROPIC_API_KEY` in production (it can expose the key to the browser bundle).

## 2. Redeploy

After saving the variable: **Deployments** → latest deployment → **Redeploy** (or push to `main` on GitHub).

## 3. Verify

```bash
curl https://optimumscs-gamma.vercel.app/api/ask-optimum
```

Expected: `{"status":"ok","version":"2026-05-30"}`

```bash
curl -X POST https://optimumscs-gamma.vercel.app/api/ask-optimum \
  -H "Content-Type: application/json" \
  -d "{\"messages\":[{\"role\":\"user\",\"content\":\"Say LIVE_OK\"}]}"

curl -X POST https://optimumscs-gamma.vercel.app/api/submit-form \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"quote\",\"fields\":{\"Name\":\"Test\",\"Email\":\"test@example.com\",\"Industry\":\"FMCG\",\"Scope of Work\":\"API test\"}}"
```

- `503` + `"error":"no-key"` → env var missing or not redeployed  
- `200` + `"success":true` on submit-form → forms will email OptimumSCS via Web3Forms  
- `200` + `"text"` on ask-optimum → live AI is working  

## 4. Git connection

Ensure the Vercel project is linked to `kuhamba-tech/optimumscs` branch `main` so pushes deploy automatically.

## 5. If deployments fail in ~5 seconds

Check the build log. Common causes:

- Invalid `vercel.json` (do not mix `builds` with `outputDirectory`, or use glob patterns in `functions`)
- This project uses a minimal `vercel.json` (SPA rewrite only); `/api/*` is auto-detected from `api/ask-optimum.cjs`

**Vercel project settings (Dashboard → Settings → General):**

- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
