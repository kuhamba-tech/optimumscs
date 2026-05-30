# Deploy to OptimumSCS Vercel (`optimumscs.vercel.app`)

Use this when moving from your personal Vercel (`optimumscs-gamma.vercel.app`) to the **OptimumSCS company** Vercel account linked to [https://optimumscs.vercel.app/](https://optimumscs.vercel.app/).

## Current situation

| URL | What it is |
|-----|------------|
| [optimumscs.vercel.app](https://optimumscs.vercel.app/) | **Old** static site — no `/fee-quote`, no `/api/submit-form` |
| [optimumscs-gamma.vercel.app](https://optimumscs-gamma.vercel.app/) | **New** React app (forms + AskOptimumSCS APIs) on your personal Vercel |

After this guide, **optimumscs.vercel.app** should serve the **same new app** with the **same environment variables** as gamma.

---

## Step 1 — Code on GitHub

The latest app is on **`main`** here:

**https://github.com/kuhamba-tech/optimumscs**

If OptimumSCS has its own GitHub repo, push `main` there first. Otherwise you can import `kuhamba-tech/optimumscs` in Vercel (grant the OptimumSCS Vercel team access to that repo in GitHub → Settings → Collaborators or install the Vercel GitHub app for the org).

---

## Step 2 — OptimumSCS Vercel: connect GitHub

1. Log in to the **OptimumSCS** Vercel account (the one that owns `optimumscs.vercel.app`).
2. **Add New… → Project**.
3. **Import** the GitHub repository (`optimumscs` or `kuhamba-tech/optimumscs`).
4. Framework preset: **Vite** (or Other — `vercel.json` in the repo defines builds).
5. **Build command:** `npm run vercel-build` (or `npm run build`)
6. **Output directory:** `dist`
7. **Root directory:** `.` (repo root)
8. Deploy once (env vars come next).

If a project named `optimumscs` already exists with the **old** site, either:

- **Replace it:** open that project → **Settings → Git** → connect this repo and redeploy, or  
- **New project:** deploy, then **Settings → Domains** → assign `optimumscs.vercel.app` to the new project.

---

## Step 3 — Copy environment variables (same as working gamma)

In Vercel → **your optimumscs project** → **Settings → Environment Variables**, add for **Production** and **Preview**:

| Key | Purpose | Value |
|-----|---------|--------|
| **`WEB3FORMS_ACCESS_KEY`** | Fee Quote, Book Consultation, Contact | Same key that worked locally and on gamma (`53b3ff69-c4bb-4ad6-aea7-c745b5fc87d3`) |
| **`ANTHROPIC_API_KEY`** | AskOptimumSCS live AI | Same `sk-ant-...` as in your local `.env` |

Optional (careers forms only, client-side):

| Key | Purpose |
|-----|---------|
| `VITE_WEB3FORMS_RECRUIT_KEY` | Careers / talent forms only |

Do **not** rely on `VITE_WEB3FORMS_KEY` alone in production — the server route uses **`WEB3FORMS_ACCESS_KEY`**.

---

## Step 4 — Redeploy

**Deployments** → latest → **⋯ → Redeploy** (env vars apply only after redeploy).

Wait until status is **Ready**.

---

## Step 5 — Verify production

From the project folder:

```powershell
powershell -File scripts/test-vercel-apis.ps1 -BaseUrl "https://optimumscs.vercel.app"
```

**Pass:**

- `GET /api/ask-optimum` → `{"status":"ok",...}`
- `POST /api/submit-form` → `{"success":true}` (not `no-key`)

**Browser:**

- https://optimumscs.vercel.app/fee-quote → submit → green **“Quote request sent!”**

---

## Optional — Deploy from your PC (CLI)

After logging in on **your machine** (do not share passwords in chat):

```powershell
cd "path\to\optimumscs"
npx vercel@41 login
npx vercel@41 link
# Choose the OptimumSCS team and the optimumscs project
npx vercel@41 env add WEB3FORMS_ACCESS_KEY production
npx vercel@41 env add ANTHROPIC_API_KEY production
npx vercel@41 --prod
```

---

## Checklist

- [ ] GitHub repo connected to OptimumSCS Vercel project  
- [ ] `WEB3FORMS_ACCESS_KEY` set (Production + Preview)  
- [ ] `ANTHROPIC_API_KEY` set (if using AI widget)  
- [ ] Redeploy completed  
- [ ] `/fee-quote` loads (not 404)  
- [ ] Fee quote form sends successfully  

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `/fee-quote` 404 | Old deployment still live — connect **this** repo and redeploy, or point domain to the new project |
| `/api/submit-form` → `no-key` | Add `WEB3FORMS_ACCESS_KEY`, then **Redeploy** |
| `/api/*` returns HTML | Ensure repo includes root `vercel.json` (API builds + routes) |
| Forms fail with 500 | Confirm Web3Forms key is the **fee quote** key, not the careers recruit key |

See also [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md) and [VERCEL.md](./VERCEL.md).
