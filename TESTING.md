# Local testing checklist

Run the dev server first:

```bash
npm run dev
```

Open **http://localhost:5173**

## 1. Fee Quote (`/fee-quote`)

1. Fill Name, Email, Industry, Scope of Work.
2. Click **Send Quote**.
3. **Pass:** Green message: “Quote request sent! We will respond within 24 hours.”
4. **DevTools → Network:** `submit-form` → status **200** (or browser call to `api.web3forms.com` in dev).
5. Check your Web3Forms / email inbox for the submission.

## 2. Book Consultation (`/book-consultation`)

Same as above — green success message after submit.

## 3. Contact (`/contact`)

Submit the inquiry form — green “Message sent!”.

## 4. AskOptimumSCS (widget, bottom-right)

1. Open widget → **Quick assessment** or **Free-form AI chat**.
2. Send a message.
3. **Pass:** Reply from Claude (no yellow “guided only” banner).
4. Requires `ANTHROPIC_API_KEY` in `.env` and dev server restarted.

## 5. API smoke test (optional)

With `npm run dev` running:

```powershell
powershell -File scripts/test-local-apis.ps1
```

## Production (Vercel)

After tests pass locally, set on Vercel and redeploy:

- `WEB3FORMS_ACCESS_KEY` = fee quote key (`53b3ff69-...`)
- `ANTHROPIC_API_KEY` = your Anthropic key

See [VERCEL.md](./VERCEL.md).
