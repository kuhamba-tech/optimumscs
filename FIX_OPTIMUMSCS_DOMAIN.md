# Fix: optimumscs.vercel.app still shows the OLD site

## Quick fix (terminal — 2 minutes)

In the project folder, run:

```powershell
.\RUN_FIX_DOMAIN.ps1
```

Log in when the browser opens, then the script points **optimumscs.vercel.app** at the **new** site (same as gamma).

---

# Fix: Git connected but optimumscs.vercel.app still shows old site

Git push to **kuhamba-tech/optimumscs** updates **optimumscs-gamma.vercel.app** (new site).

**optimumscs.vercel.app** is a **different Vercel project** still serving the old HTML site.

---

## Fastest fix (recommended) — use gamma + your domain

You already have the new site + env vars on **optimumscs-gamma**.

1. [vercel.com/dashboard](https://vercel.com/dashboard) → project **optimumscs-gamma**
2. **Settings → Domains** → **Add** → `optimumscs.vercel.app`
3. If blocked: open project **optimumscs** (old) → **Domains** → **Remove** `optimumscs.vercel.app`
4. Add it again on **optimumscs-gamma**
5. Wait 1–2 minutes → open https://optimumscs.vercel.app/fee-quote (should return **200**)

No code changes needed. Every `git push` to `main` keeps updating the site.

---

## Alternative — deploy new code on project **optimumscs**

1. Open project **optimumscs** (the one that already has `optimumscs.vercel.app`)
2. **Settings → Git** → must be **kuhamba-tech/optimumscs**, branch **main**
   - If it shows another repo (old static site), click **Disconnect** → **Connect** → choose **kuhamba-tech/optimumscs**
3. **Settings → General**
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
4. **Environment Variables** (copy from gamma):
   - `WEB3FORMS_ACCESS_KEY`
   - `ANTHROPIC_API_KEY`
5. **Deployments** → **Redeploy**

---

## Verify

```powershell
powershell -File scripts/test-vercel-apis.ps1 -BaseUrl "https://optimumscs.vercel.app"
```

**Pass:** `/fee-quote` loads and forms API returns `"success":true`.
