# Vercel environment variables (copy from working local `.env`)

Your **local fee quote works** with this key. Add the **same** values on Vercel.

## Steps

1. Open [vercel.com](https://vercel.com) → the project for **`optimumscs.vercel.app`** (OptimumSCS account) or `optimumscs-gamma.vercel.app` (personal test).
2. **Settings** → **Environment Variables** → **Add New**.

### Variable 1 — Forms (required for Fee Quote, Book Consultation, Contact)

| Field | Value |
|--------|--------|
| **Key** | `WEB3FORMS_ACCESS_KEY` |
| **Value** | `53b3ff69-c4bb-4ad6-aea7-c745b5fc87d3` |
| **Environments** | Production, Preview |

### Variable 2 — AskOptimumSCS AI (optional but recommended)

| Field | Value |
|--------|--------|
| **Key** | `ANTHROPIC_API_KEY` |
| **Value** | Same `sk-ant-...` value as in your local `.env` |
| **Environments** | Production, Preview |

3. **Deployments** → latest → **⋯** → **Redeploy** (uncheck build cache if offered).
4. Wait until status is **Ready**.

## Verify after redeploy

```powershell
powershell -File scripts/test-vercel-apis.ps1 -BaseUrl "https://optimumscs.vercel.app"
```

Or open https://optimumscs.vercel.app/fee-quote (production) or https://optimumscs-gamma.vercel.app/fee-quote (test) — expect the same green message as local.

Full company-account steps: [OPTIMUMSCS_VERCEL_DEPLOY.md](./OPTIMUMSCS_VERCEL_DEPLOY.md).

**API check:** `POST /api/submit-form` should return `{"success":true}` (not `no-key`).
