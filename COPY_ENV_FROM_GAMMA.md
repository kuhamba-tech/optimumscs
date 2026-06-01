# Copy environment variables from optimumscs-gamma → new Vercel project

Source (working AI): [optimumscs-gamma.vercel.app](https://optimumscs-gamma.vercel.app/)

---

## Variables to add (new project **optimumscs** on account optimumscs-8250)

| Vercel name | Used for |
|-------------|----------|
| `ANTHROPIC_API_KEY` | AskOptimumSCS (`/api/ask-optimum`) |
| `WEB3FORMS_ACCESS_KEY` | Fee quote, contact, consultation (`/api/submit-form`) |
| `VITE_WEB3FORMS_RECRUIT_KEY` | Careers forms (optional, client build) |

Optional alias (same value as `WEB3FORMS_ACCESS_KEY`):

| `VITE_WEB3FORMS_KEY` | Dev / fallback |

---

## Method A — Dashboard (no CLI)

1. Open **optimumscs-gamma** on Vercel → **Settings** → **Environment Variables**
2. Copy each value (eye icon)
3. Open **optimumscs** (new project) → **Settings** → **Environment Variables**
4. Paste the same names and values for **Production** and **Preview**
5. **Redeploy**

Or copy from your local **`.env`** (same keys as gamma when it was working).

---

## Method B — Script (after CLI login)

```powershell
npx vercel@41 login info@optimumscs.com
npx vercel@41 link
powershell -File scripts/setup-vercel-env.ps1
npx vercel@41 --prod
```

Reads `.env` and uploads to the linked Vercel project (does not print secrets).

---

## Import repo (if not deployed yet)

Paste in [vercel.com/new](https://vercel.com/new):

```
https://github.com/kuhamba-tech/optimumscs
```

Build: `npm run vercel-build` | Output: `dist`

---

## Verify

```powershell
powershell -File scripts/test-vercel-apis.ps1 -BaseUrl "https://optimumscs.vercel.app"
```

Pass: `ask-optimum` OK, `submit-form` returns `"success":true`.
