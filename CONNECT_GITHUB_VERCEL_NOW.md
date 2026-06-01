# Connect GitHub + Vercel now (optimumscs-8250)

Three browser tabs should have opened. Complete each, then run the script.

---

## Tab 1 — Vercel account settings

https://vercel.com/account/settings

1. **Login Connections** → **GitHub** → **Connect**
2. Sign in to GitHub if asked
3. Authorize **Vercel**

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
