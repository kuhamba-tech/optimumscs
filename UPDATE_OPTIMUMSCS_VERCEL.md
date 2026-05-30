# Update `optimumscs.vercel.app` from your Vercel account

Your **new** site (Fee Quote, forms API, AskOptimumSCS) is deployed at:

**https://optimumscs-gamma.vercel.app**

**https://optimumscs.vercel.app** is still an **older** deployment (no `/fee-quote`, no `/api/*`).

Do this in **your** Vercel account (the one connected to `kuhamba-tech/optimumscs`).

---

## Option A — Update the existing `optimumscs` project (recommended)

Use this if you already have a Vercel project named **optimumscs** with domain `optimumscs.vercel.app`.

1. [vercel.com/dashboard](https://vercel.com/dashboard) → open project **optimumscs** (not gamma).
2. **Settings → Git** → **Connect** repository:
   - `kuhamba-tech/optimumscs`
   - Branch: **`main`**
3. **Settings → General** (confirm):
   - Framework: **Vite**
   - Build Command: `npm run vercel-build` or `npm run build`
   - Output Directory: **`dist`**
4. **Settings → Environment Variables** (copy from gamma / local):

   | Name | Environments |
   |------|----------------|
   | `WEB3FORMS_ACCESS_KEY` | Production, Preview |
   | `ANTHROPIC_API_KEY` | Production, Preview |

5. **Deployments** → **Redeploy** latest (or push to `main` on GitHub).

After **Ready**, open:

- https://optimumscs.vercel.app/fee-quote  
- Submit form → green success message  

---

## Option B — Point the domain at your gamma project

Use this if **optimumscs-gamma** already has the new code and env vars.

1. Open project **optimumscs-gamma**.
2. **Settings → Domains** → **Add** → `optimumscs.vercel.app`.
3. If Vercel says the domain is used elsewhere:
   - Open the **other** project (old optimumscs) → **Domains** → **Remove** `optimumscs.vercel.app`.
   - Add it again on **optimumscs-gamma**.
4. Wait for DNS/domain status **Valid**, then test `/fee-quote`.

---

## Trigger deploy from your PC (after `vercel login`)

```powershell
cd "path\to\optimumscs"
npx vercel@41 login
npx vercel@41 link
# Select your team and the optimumscs (or optimumscs-gamma) project
npx vercel@41 --prod
```

---

## Verify

```powershell
powershell -File scripts/test-vercel-apis.ps1 -BaseUrl "https://optimumscs.vercel.app"
```

**Pass:** `/api/ask-optimum` OK and `/api/submit-form` returns `"success":true`.
