# Local API smoke tests — run while `npm run dev` is running on http://localhost:5173

$base = "http://localhost:5173"

Write-Host "`n=== 1. AskOptimumSCS health ===" -ForegroundColor Cyan
try {
  $ai = Invoke-RestMethod -Uri "$base/api/ask-optimum" -Method GET
  $ai | ConvertTo-Json
} catch {
  Write-Host "FAIL: $_" -ForegroundColor Red
  Write-Host "Restart dev server: npm run dev" -ForegroundColor Yellow
}

Write-Host "`n=== 2. Fee quote form (submit-form) ===" -ForegroundColor Cyan
$body = @{
  type   = "quote"
  fields = @{
    Name          = "Test User"
    Company       = "Test Co"
    Email         = "test@example.com"
    Industry      = "FMCG"
    "Scope of Work" = "Local API test - safe to ignore"
  }
} | ConvertTo-Json -Depth 4

try {
  $form = Invoke-WebRequest -Uri "$base/api/submit-form" -Method POST `
    -ContentType "application/json" -Body $body -UseBasicParsing
  Write-Host "HTTP $($form.StatusCode)"
  Write-Host $form.Content
  if ($form.Content -match '"success":true') {
    Write-Host "PASS - Web3Forms key works" -ForegroundColor Green
  } elseif ($form.Content -match 'no-key') {
    Write-Host "FAIL - Add WEB3FORMS_ACCESS_KEY to .env and restart npm run dev" -ForegroundColor Red
  } else {
    Write-Host "CHECK - See response above" -ForegroundColor Yellow
  }
} catch {
  Write-Host "FAIL: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== 3. Browser UI ===" -ForegroundColor Cyan
Write-Host "Open:"
Write-Host "  $base/fee-quote"
Write-Host "  $base/book-consultation (or your consultation route)"
Write-Host "Submit forms - expect green success message.`n"
