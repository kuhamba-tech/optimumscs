# Deployment — `optimumscs.vercel.app` (same as gamma)

Replace the **old** site at [optimumscs.vercel.app](https://optimumscs.vercel.app/) with this React app (same as [optimumscs-gamma.vercel.app](https://optimumscs-gamma.vercel.app/)).

**Git repo:** https://github.com/kuhamba-tech/optimumscs — branch **`main`**

---

## One-time setup (Vercel dashboard)

Do this on the Vercel project that owns **`optimumscs.vercel.app`** (project name is usually **optimumscs**, not **optimumscs-gamma**).

### 1. Connect Git (auto-deploy on every push)

1. [vercel.com/dashboard](https://vercel.com/dashboard) → project **optimumscs**
2. **Settings → Git** → connect **`kuhamba-tech/optimumscs`**, branch **`main`**
3. **Settings → General**
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Root: `.`

Every `git push` to `main` will then deploy to **optimumscs.vercel.app**.

### 2. Environment variables (same as gamma)

**Settings → Environment Variables** → Production + Preview:

| Name | Used for |
|------|----------|
| `WEB3FORMS_ACCESS_KEY` | Fee Quote, Book Consultation, Contact |
| `ANTHROPIC_API_KEY` | AskOptimumSCS AI |

Copy the **same values** from project **optimumscs-gamma** (or your local `.env`).

### 3. Redeploy once

**Deployments** → **Redeploy** (env vars and Git connection apply after redeploy).

### 4. Optional — move domain from old project to gamma

If **optimumscs** cannot use this repo, use project **optimumscs-gamma**:

1. Remove `optimumscs.vercel.app` from the old **optimumscs** project (**Settings → Domains**)
2. Add `optimumscs.vercel.app` on **optimumscs-gamma**
3. Connect **optimumscs-gamma** to `kuhamba-tech/optimumscs` on `main`

---

## Optional — GitHub Actions deploy

If Vercel Git integration is not used, add these **GitHub repository secrets**  
(repo → **Settings → Secrets and variables → Actions**):

| Secret | Where to find it |
|--------|------------------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Project **Settings → General** (Team/Org ID) |
| `VERCEL_PROJECT_ID` | Project **Settings → General** — use the **optimumscs** project ID |

Or run locally after `npx vercel@41 login` and `npx vercel@41 link` (select **optimumscs**):

```powershell
type .vercel\project.json
```

Workflow: `.github/workflows/deploy-production.yml` — runs on every push to `main` when secrets are set.

---

## Verify production

```powershell
powershell -File scripts/test-vercel-apis.ps1 -BaseUrl "https://optimumscs.vercel.app"
```

Browser:

- https://optimumscs.vercel.app/fee-quote — form works
- https://optimumscs.vercel.app — new React site (not old “Go beyond logistics” page)

---

## Day-to-day updates

```bash
git add .
git commit -m "Your change"
git push origin main
```

Vercel rebuilds automatically (Git integration or GitHub Action).

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Still old homepage | Wrong Vercel project — connect **optimumscs** to this repo or move domain to **gamma** |
| `/fee-quote` 404 | Old deployment — redeploy from this repo |
| Forms `no-key` | Add `WEB3FORMS_ACCESS_KEY`, redeploy |
| APIs 404 | Ensure `vercel.json` is in repo root (included in this project) |

See also [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md), [UPDATE_OPTIMUMSCS_VERCEL.md](./UPDATE_OPTIMUMSCS_VERCEL.md).
