# Connect OptimumSCS Git + optimumscs.vercel.app (2 steps)

Your code is ready on GitHub: **kuhamba-tech/optimumscs** (`main`).

## Step 1 — Log in to Vercel (in your terminal)

In the project folder, run:

```powershell
cd "c:\Users\Tapiwa\Documents\Timothy\optimum\website update\final_project_about_image_updated\Optimumscs_Project\optimumscs"
npx vercel@41 login
```

Complete login in the browser.

## Step 2 — Run the connect script

Replace `YOUR-ORG` with your OptimumSCS GitHub org/user and repo name:

```powershell
powershell -File scripts/connect-git-vercel.ps1 -GitRepoUrl "https://github.com/YOUR-ORG/optimumscs.git"
```

When `vercel link` asks for a project, pick **optimumscs** (the one with **optimumscs.vercel.app**).

---

## If you use kuhamba-tech repo on Vercel (no separate OptimumSCS repo)

In [Vercel Dashboard](https://vercel.com/dashboard) only:

1. Project **optimumscs** → **Settings → Git** → connect **kuhamba-tech/optimumscs**, branch **main**
2. Copy env vars from **optimumscs-gamma**: `WEB3FORMS_ACCESS_KEY`, `ANTHROPIC_API_KEY`
3. **Redeploy**

---

## After connect

Every `git push` updates https://optimumscs.vercel.app/

Test:

```powershell
powershell -File scripts/test-vercel-apis.ps1 -BaseUrl "https://optimumscs.vercel.app"
```
