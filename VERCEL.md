# Vercel deployment — AskOptimumSCS live AI

Site: [https://optimumscs-gamma.vercel.app/](https://optimumscs-gamma.vercel.app/)

## 1. Environment variable (required)

In [Vercel Dashboard](https://vercel.com) → your project → **Settings** → **Environment Variables**:

| Name | Value | Environments |
|------|--------|----------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key (`sk-ant-...`) | Production, Preview |

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
```

- `503` + `"error":"no-key"` → env var missing or not redeployed  
- `200` + `"text"` → live AI is working  

## 4. Git connection

Ensure the Vercel project is linked to `kuhamba-tech/optimumscs` branch `main` so pushes deploy automatically.
