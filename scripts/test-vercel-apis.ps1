# Test production APIs after WEB3FORMS_ACCESS_KEY is set on Vercel

$base = "https://optimumscs-gamma.vercel.app"

Write-Host "`n=== AskOptimumSCS ===" -ForegroundColor Cyan
try {
  $ai = Invoke-RestMethod -Uri "$base/api/ask-optimum" -Method GET
  $ai | ConvertTo-Json
} catch { Write-Host "FAIL: $_" -ForegroundColor Red }

Write-Host "`n=== Fee quote (submit-form) ===" -ForegroundColor Cyan
$body = @{
  type   = "quote"
  fields = @{
    Name          = "Vercel Test"
    Email         = "test@example.com"
    Industry      = "FMCG"
    "Scope of Work" = "Production verification"
  }
} | ConvertTo-Json -Depth 4

try {
  $r = Invoke-WebRequest -Uri "$base/api/submit-form" -Method POST `
    -ContentType "application/json" -Body $body -UseBasicParsing
  Write-Host "HTTP $($r.StatusCode)"
  Write-Host $r.Content
  if ($r.Content -match '"success":\s*true') {
    Write-Host "PASS - Forms work on Vercel" -ForegroundColor Green
  } elseif ($r.Content -match 'no-key') {
    Write-Host "FAIL - Add WEB3FORMS_ACCESS_KEY on Vercel and redeploy" -ForegroundColor Red
  }
} catch { Write-Host "FAIL: $_" -ForegroundColor Red }

Write-Host "`nUI: $base/fee-quote`n"
