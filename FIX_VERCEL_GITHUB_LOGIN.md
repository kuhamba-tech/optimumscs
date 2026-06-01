# Fix: "Vercel CLI Login Failed" / GitHub email already has an account

## What happened

You used **GitHub** to log into the **Vercel CLI**.  
Your GitHub email is **already** tied to Vercel account **optimumscs-8250** (**info@optimumscs.com**).

Vercel says: log in with **email**, then **link** GitHub in settings.

---

## Fix (browser — recommended)

1. Close the failed CLI login tab.

2. **Log in with email:**  
   https://vercel.com/login  
   - Use **info@optimumscs.com** (password or magic link)

3. **Link GitHub (while logged in):**  
   - Go to https://vercel.com/account  
   - Open **Settings** (or profile menu → **Account Settings**)  
   - Find **Authentication** / **Login Connections**  
   - **GitHub** → **Connect**  
   - **Avoid** broken URLs like `/account/settings/authentication` if they show **404**  
   - **Not** "Sign up with GitHub"

4. Continue **Tab 2 & 3:**  
   https://github.com/apps/vercel/installations/new (repo access)  
   https://vercel.com/new (import **kuhamba-tech/optimumscs**)

You do **not** need CLI login to deploy if you import the repo in the dashboard.

---

## Fix (CLI — only if you need terminal deploy)

```powershell
npx vercel@41 login info@optimumscs.com
```

Use **email** login when prompted — **not** `--github`.

After login:

```powershell
powershell -File scripts/deploy-optimumscs-vercel.ps1
```

---

## Summary

| Wrong | Right |
|-------|--------|
| `vercel login --github` | Log in at vercel.com with **info@optimumscs.com** |
| Sign up with GitHub | **Connect** GitHub in Account → Authentication |
