# Deploy on Vercel — account **optimumscs-8250** (info@optimumscs.com)

GitHub repo: **https://github.com/kuhamba-tech/optimumscs**  
Branch: **`main`**

You are on the Vercel **account** page. Follow these steps to create the website.

---

## Step 1 — Connect GitHub to this Vercel account

1. Open **https://vercel.com/account**
2. Left menu or profile → **Settings** (account settings, not team)
3. Find **Login Connections** or **Connected Accounts**
4. Click **Connect** next to **GitHub**
5. Authorize Vercel and allow access to **kuhamba-tech** (or all repos)

---

## Step 2 — Create the project (import repo)

1. Open **https://vercel.com/new**
2. Under **Import Git Repository**, find **`kuhamba-tech/optimumscs`**
   - If missing: **Adjust GitHub App Permissions** → grant access to that repo
3. Click **Import**

---

## Step 3 — Build settings

| Field | Value |
|-------|--------|
| Project Name | `optimumscs` (gives **optimumscs.vercel.app**) |
| Framework | Vite |
| Root Directory | `.` |
| Build Command | `npm run vercel-build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

Click **Deploy**.

---

## Step 4 — Environment variables

After the first deploy (or before redeploy):

1. Project **optimumscs** → **Settings** → **Environment Variables**
2. Add (Production + Preview):

| Name | Value |
|------|---------|
| `WEB3FORMS_ACCESS_KEY` | Your Web3Forms fee-quote key |
| `ANTHROPIC_API_KEY` | Your Anthropic `sk-ant-...` key |

3. **Deployments** → latest → **⋯** → **Redeploy**

---

## Step 5 — Production URL

Your site will be at:

- **https://optimumscs.vercel.app** (if project name is `optimumscs`)
- Or **https://optimumscs-8250.vercel.app** (if Vercel uses your username)

Check **Settings → Domains** for the exact URL.

Test: **/fee-quote** should load (not 404).

---

## Optional — Team “OptimumSCS”

On **https://vercel.com/account** you see **No teams found**.

- For a company team: click **Create a Team** → name **OptimumSCS** → move the project there later.
- For now, deploying on your **personal** account **optimumscs-8250** is fine.

---

## If **optimumscs.vercel.app** is already used (old site)

1. Old project **optimumscs** → **Settings → Domains** → remove `optimumscs.vercel.app`
2. New project → **Domains** → add `optimumscs.vercel.app`

Or rename the new project to **`optimumscs`** when importing.

---

## Verify

```powershell
powershell -File scripts/test-vercel-apis.ps1 -BaseUrl "https://optimumscs.vercel.app"
```

Every `git push` to **main** on GitHub will auto-redeploy.
