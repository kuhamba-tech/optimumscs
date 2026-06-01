# Where to go on Vercel (you are on the WRONG page)

## You are here now (wrong for deploy)

**Account → Settings** (Avatar, Display Name)

That only changes your profile. It does **not** deploy the website.

---

## Go here instead (3 clicks)

### 1. Open the dashboard

**https://vercel.com/dashboard**

Or click **Vercel logo** (top left) → you leave Account settings.

### 2. Add the project

On the dashboard, click the big button:

**Add New…** → **Project**

Or open directly:

**https://vercel.com/new**

### 3. Import GitHub repo

1. You should see **Import Git Repository**
2. Click **Import** on **`kuhamba-tech/optimumscs`**
   - Repo link: https://github.com/kuhamba-tech/optimumscs
3. If the repo is missing:
   - Click **Adjust GitHub App Permissions**
   - Allow access to **kuhamba-tech** / **optimumscs**

### 4. On the configure screen

| Field | Value |
|-------|--------|
| Project Name | `optimumscs` |
| Framework | Vite |
| Build Command | `npm run vercel-build` |
| Output Directory | `dist` |

Click **Deploy**.

### 5. After deploy finishes

- Open the URL Vercel shows (e.g. **optimumscs.vercel.app**)
- **Settings → Environment Variables** → add `WEB3FORMS_ACCESS_KEY` and `ANTHROPIC_API_KEY`
- **Deployments → Redeploy**

---

## Quick map

| Page | URL | Purpose |
|------|-----|---------|
| ❌ Account Settings | vercel.com/account | Profile only |
| ✅ Dashboard | vercel.com/dashboard | Your projects |
| ✅ New project | vercel.com/new | Import GitHub & deploy |

---

## GitHub side (already OK)

Your repo is fine: https://github.com/kuhamba-tech/optimumscs

**Deployments 79** on GitHub = old Vercel/gamma history. You still need a **new project** on account **optimumscs-8250** if you have not imported the repo there yet.
