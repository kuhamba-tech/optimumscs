# Implement now (you are logged in to Vercel)

GitHub repo is ready: **https://github.com/kuhamba-tech/optimumscs** (branch `main`)

The new site already deploys to **optimumscs-gamma.vercel.app**.  
Do **one** of the following in the Vercel dashboard:

---

## A) Fastest — point optimumscs.vercel.app at gamma (2 minutes)

1. https://vercel.com/dashboard → **optimumscs-gamma**
2. **Settings** → **Domains** → **Add** → `optimumscs.vercel.app`
3. If blocked: open project **optimumscs** (old) → **Domains** → **Remove** `optimumscs.vercel.app`
4. Add the domain again on **optimumscs-gamma**
5. Open https://optimumscs.vercel.app/fee-quote — should load the new site

Git is already linked to gamma; every `git push` updates this site.

---

## B) Use project optimumscs with GitHub repo

1. https://vercel.com/dashboard → project **optimumscs**
2. **Settings** → **Git** → connect **kuhamba-tech/optimumscs**, branch **main**
3. **General**: Build `npm run vercel-build`, Output `dist`
4. **Environment Variables**: `WEB3FORMS_ACCESS_KEY`, `ANTHROPIC_API_KEY` (copy from gamma)
5. **Deployments** → **Redeploy**

---

## CLI (optional — browser login is not enough)

In the project terminal:

```powershell
npx vercel@41 login
.\scripts\link-github-vercel.ps1
```

Or domain only:

```powershell
npx vercel@41 login
.\scripts\fix-optimumscs-domain.ps1
```

---

## Verify

```powershell
powershell -File scripts/test-vercel-apis.ps1 -BaseUrl "https://optimumscs.vercel.app"
```
