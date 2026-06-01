# Connect GitHub + Vercel now (optimumscs-8250)

Three browser tabs should have opened. Complete each, then run the script.

---

## Tab 1 — Connect GitHub (use email login, NOT CLI GitHub login)

**If you see:** *"There is already an account associated with your GitHub email"*  
→ Do **not** use `vercel login --github`. Use the steps below.

1. **Log in with email:** https://vercel.com/login  
   - Email: **info@optimumscs.com** (account **optimumscs-8250**)
2. Open: https://vercel.com/account/settings/authentication  
3. Under **Login Connections** → **GitHub** → **Connect** (not Sign up with GitHub)
4. Authorize GitHub when asked

**Do not use** `vercel login --github` — it fails when the GitHub email already has a Vercel account.

---

## Tab 2 — GitHub: allow Vercel to see the repo

https://github.com/apps/vercel/installations/new

1. Select account **kuhamba-tech** (or your user)
2. **Only select repositories** → choose **optimumscs**
3. Click **Install** / **Save**

---

## Tab 3 — Import project on Vercel

https://vercel.com/new

1. Click **Import** on **kuhamba-tech/optimumscs**
2. Project name: **optimumscs**
3. Build: `npm run vercel-build` | Output: `dist`
4. **Deploy**
5. After deploy: **Settings → Environment Variables**
   - `WEB3FORMS_ACCESS_KEY`
   - `ANTHROPIC_API_KEY`
6. **Redeploy**

---

## Or finish with terminal (after Tab 1 GitHub connect)

```powershell
powershell -File scripts/deploy-optimumscs-vercel.ps1
```

---

## Done when

- https://optimumscs.vercel.app/fee-quote loads (200)
- Forms submit successfully
