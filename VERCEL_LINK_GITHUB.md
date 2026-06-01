# Link GitHub to Vercel → optimumscs.vercel.app

**GitHub repo:** https://github.com/kuhamba-tech/optimumscs  
**Branch:** `main`  
**Production URL:** https://optimumscs.vercel.app/

---

## Part A — Log in to Vercel (browser)

1. Open **https://vercel.com/login**
2. Sign in with the account that owns **optimumscs.vercel.app** (GitHub login is fine).
3. Open **https://vercel.com/dashboard**

---

## Part B — Connect the GitHub repo (recommended)

### If project **optimumscs** already exists (has optimumscs.vercel.app)

1. Dashboard → project **optimumscs**
2. **Settings** → **Git**
3. **Connect Git Repository** (or **Disconnect** old repo first if it shows a different one)
4. Choose **GitHub** → authorize if asked
5. Select **`kuhamba-tech/optimumscs`**
6. **Production Branch:** `main`
7. Save

### If you prefer the project that already works (**optimumscs-gamma**)

1. Project **optimumscs-gamma** → **Settings** → **Domains**
2. **Add** `optimumscs.vercel.app`
3. If blocked: old project **optimumscs** → **Domains** → **Remove** `optimumscs.vercel.app`, then add on gamma

---

## Part C — Build settings (project **optimumscs**)

**Settings** → **General**:

| Setting | Value |
|---------|--------|
| Framework Preset | Vite |
| Build Command | `npm run vercel-build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Root Directory | `.` |

(`vercel.json` in the repo also defines API routes.)

---

## Part D — Environment variables (same as gamma)

**Settings** → **Environment Variables** → **Production** + **Preview**:

| Name | Purpose |
|------|---------|
| `WEB3FORMS_ACCESS_KEY` | Fee quote, contact, consultation forms |
| `ANTHROPIC_API_KEY` | AskOptimumSCS AI |

Copy values from project **optimumscs-gamma** or your local `.env`.

---

## Part E — Deploy

1. **Deployments** → **Redeploy** (latest), or  
2. Push to GitHub: `git push origin main` (auto-deploy after Git is connected)

---

## Part F — Verify

```powershell
powershell -File scripts/test-vercel-apis.ps1 -BaseUrl "https://optimumscs.vercel.app"
```

**Pass:**

- https://optimumscs.vercel.app/fee-quote loads (not 404)
- `/api/ask-optimum` returns `{"status":"ok",...}`
- Fee quote form shows green success after submit

---

## Optional — Terminal (after `npx vercel@41 login`)

```powershell
cd "path\to\optimumscs"
npx vercel@41 link
# Select project: optimumscs (or optimumscs-gamma if using domain move)

npx vercel@41 git connect https://github.com/kuhamba-tech/optimumscs.git
npx vercel@41 --prod
```

Or run: `.\scripts\link-github-vercel.ps1`

---

## Ongoing updates

Every time you push to `main` on GitHub, Vercel redeploys production automatically.
