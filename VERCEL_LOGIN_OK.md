# Vercel login is OK — use these links

You are logged in as **info@optimumscs.com** (account **optimumscs-8250**).

A **404** page means the **URL was wrong**, not that login failed.

---

## Working links (use these)

| What | URL |
|------|-----|
| Dashboard | https://vercel.com/dashboard |
| Account | https://vercel.com/account |
| New project (import GitHub) | https://vercel.com/new |
| Log in again | https://vercel.com/login |

---

## Connect GitHub (no 404)

1. Open https://vercel.com/account  
2. Click **Settings** in the left sidebar (or your avatar → **Settings**)  
3. Look for **Authentication**, **Connected Accounts**, or **Login Connections**  
4. **GitHub** → **Connect**

If you only see **Overview / Domains / Activity**, use the avatar menu (top right) → **Settings** → find GitHub there.

---

## Create the website (after GitHub connected)

1. https://vercel.com/new  
2. Import **kuhamba-tech/optimumscs**  
3. Project name: **optimumscs**  
4. Build: `npm run vercel-build` | Output: `dist`  
5. **Deploy**

---

## CLI (optional — email only)

Do **not** use `vercel login --github`.

```powershell
npx vercel@41 login info@optimumscs.com
```

---

## Log out and back in (only if needed)

1. https://vercel.com/account → **Log Out**  
2. https://vercel.com/login → **info@optimumscs.com**
