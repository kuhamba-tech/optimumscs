# Set up OptimumSCS GitHub + Vercel (company account)

Use this to mirror **kuhamba-tech/optimumscs** on an **OptimumSCS** GitHub org and deploy to **optimumscs.vercel.app**.

---

## Part 1 — OptimumSCS GitHub

### 1. Create the org / account (if needed)

1. https://github.com/organizations/plan (or use an existing business account)
2. Organization name example: **OptimumSCS**

### 2. Create repository

1. **New repository** → name: **`optimumscs`**
2. Public or Private
3. Do **not** add README (repo can stay empty)

### 3. Push this project to OptimumSCS GitHub

In your project folder (replace `YOUR-ORG` with your GitHub org or username):

```powershell
git remote add optimumscs https://github.com/YOUR-ORG/optimumscs.git
git push -u optimumscs main
```

Or run:

```powershell
powershell -File scripts/push-to-optimumscs-github.ps1 -RepoUrl "https://github.com/YOUR-ORG/optimumscs.git"
```

Keep **origin** → `kuhamba-tech/optimumscs` for your personal copy.

---

## Part 2 — Vercel account / team (OptimumSCS)

### 1. Sign up or add team

1. https://vercel.com/signup
2. **Continue with GitHub** (use the GitHub account that has access to **OptimumSCS/optimumscs**)
3. Optional: **Create Team** → name **OptimumSCS**

### 2. Import project from GitHub

1. **Add New… → Project**
2. Import **`OptimumSCS/optimumscs`** (or `kuhamba-tech/optimumscs` if org repo not ready)
3. **Production branch:** `main`
4. Framework: **Vite**
5. Build Command: `npm run vercel-build`
6. Output Directory: `dist`

### 3. Environment variables

**Settings → Environment Variables** (Production + Preview):

| Name | Purpose |
|------|---------|
| `WEB3FORMS_ACCESS_KEY` | Fee quote, contact, consultation |
| `ANTHROPIC_API_KEY` | AskOptimumSCS AI |

### 4. Production domain

- Default: `optimumscs.vercel.app` (project name **optimumscs**)
- Or add custom domain later under **Settings → Domains**

### 5. Deploy

Deploy runs automatically on every `git push` to `main`.

---

## Part 3 — Keep both Git remotes updated

```powershell
powershell -File scripts/push-all-remotes.ps1
```

Pushes to **origin** (kuhamba-tech) and **optimumscs** (if configured).

---

## Part 4 — CLI link (optional)

```powershell
npx vercel@41 login
npx vercel@41 link
# Select OptimumSCS team and project optimumscs

npx vercel@41 git connect https://github.com/YOUR-ORG/optimumscs.git
```

---

## Verify

```powershell
powershell -File scripts/test-vercel-apis.ps1 -BaseUrl "https://optimumscs.vercel.app"
```

Open https://optimumscs.vercel.app/fee-quote — new React site, forms working.
