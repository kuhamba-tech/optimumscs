# Fix: 404 DEPLOYMENT_NOT_FOUND on optimumscs.vercel.app

## What it means

The domain **optimumscs.vercel.app** exists on Vercel, but **no live deployment** is attached (old project deleted or never deployed on **optimumscs-8250**).

Your **working site** is here today:

**https://optimumscs-gamma.vercel.app** (200 OK)

---

## Fix A — Deploy on account optimumscs-8250 (recommended)

### 1. Import & deploy

1. **https://vercel.com/dashboard** (logged in as **info@optimumscs.com**)
2. **Add New → Project**
3. Paste in the repo box:

   ```
   https://github.com/kuhamba-tech/optimumscs
   ```

   (Do **not** use only the **OPTIMUMSCS** GitHub dropdown — use **kuhamba-tech** repo URL.)

4. Settings:
   - Name: **optimumscs**
   - Build: `npm run vercel-build`
   - Output: `dist`
5. **Deploy** → wait until **Ready**

### 2. Attach the domain

1. Open project **optimumscs** → **Settings → Domains**
2. Add **optimumscs.vercel.app** (or confirm it is listed and **Valid**)
3. If domain is stuck on a dead project: remove it there first, then add on this project.

### 3. Environment variables

**Settings → Environment Variables** (Production + Preview):

| Name |
|------|
| `ANTHROPIC_API_KEY` |
| `WEB3FORMS_ACCESS_KEY` |
| `VITE_WEB3FORMS_RECRUIT_KEY` (optional) |

Copy values from **optimumscs-gamma** or your local `.env`.  
**Redeploy.**

---

## Fix B — Point domain at gamma (fast if gamma is on your Vercel)

If **optimumscs-gamma** is on the **same** Vercel login:

1. Project **optimumscs-gamma** → **Settings → Domains**
2. **Add** `optimumscs.vercel.app`
3. Remove domain from any broken/empty project

---

## Fix C — Use gamma until production is fixed

Share this link until **optimumscs.vercel.app** works:

**https://optimumscs-gamma.vercel.app**

---

## Verify

```powershell
powershell -File scripts/test-vercel-apis.ps1 -BaseUrl "https://optimumscs.vercel.app"
```

Pass: no `DEPLOYMENT_NOT_FOUND`, `/fee-quote` returns **200**.
