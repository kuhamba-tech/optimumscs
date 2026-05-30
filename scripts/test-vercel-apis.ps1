param(
  [string]$BaseUrl = "https://optimumscs.vercel.app"
)

Write-Host "Testing: $BaseUrl" -ForegroundColor Yellow

Write-Host "`n=== AskOptimumSCS ===" -ForegroundColor Cyan
try {
  $ai = Invoke-RestMethod -Uri "$BaseUrl/api/ask-optimum" -Method GET
  $ai | ConvertTo-Json
} catch {
  Write-Host "FAIL: $_" -ForegroundColor Red
  Write-Host "If 404: this URL may still be the old site - deploy the new repo first." -ForegroundColor Yellow
}

Write-Host "`n=== Fee quote (submit-form) ===" -ForegroundColor Cyan
$body = @{
  type   = "quote"
  fields = @{
    Name            = "Vercel Test"
    Email           = "test@example.com"
    Industry        = "FMCG"
    "Scope of Work" = "Production verification"
  }
} | ConvertTo-Json -Depth 4

try {
  $r = Invoke-WebRequest -Uri "$BaseUrl/api/submit-form" -Method POST `
    -ContentType "application/json" -Body $body -UseBasicParsing
  Write-Host "HTTP $($r.StatusCode)"
  Write-Host $r.Content
  if ($r.Content -match '"success":\s*true') {
    Write-Host "PASS - Forms work on Vercel" -ForegroundColor Green
  } elseif ($r.Content -match 'no-key') {
    Write-Host "FAIL - Add WEB3FORMS_ACCESS_KEY on Vercel and redeploy" -ForegroundColor Red
  } elseif ($r.StatusCode -eq 404) {
    Write-Host "FAIL - API route missing (old deployment or wrong project)" -ForegroundColor Red
  }
} catch {
  Write-Host "FAIL: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "UI: $BaseUrl/fee-quote"
Write-Host ""
