# Push main to GitHub to trigger Vercel deploy (when Git is connected in dashboard)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "Pushing main to origin (kuhamba-tech/optimumscs)..." -ForegroundColor Cyan
git push origin main

Write-Host "`nWaiting for optimumscs.vercel.app to update (up to 3 min)..." -ForegroundColor Cyan
$base = "https://optimumscs.vercel.app"
$ok = $false
foreach ($i in 1..12) {
  Start-Sleep -Seconds 15
  try {
    $code = (Invoke-WebRequest -Uri "$base/fee-quote" -UseBasicParsing -MaximumRedirection 0).StatusCode
    if ($code -eq 200) {
      $ok = $true
      break
    }
  } catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 200) { $ok = $true; break }
  }
  Write-Host "  attempt $i/12 - not ready yet..."
}

if ($ok) {
  Write-Host "PASS - New site is live at $base/fee-quote" -ForegroundColor Green
  powershell -File "$PSScriptRoot\test-vercel-apis.ps1" -BaseUrl $base
} else {
  Write-Host "Still old site or building. In Vercel dashboard:" -ForegroundColor Yellow
  Write-Host "  1. Project optimumscs -> Settings -> Git -> repo must be kuhamba-tech/optimumscs branch main"
  Write-Host "  2. Settings -> General -> Build: npm run vercel-build, Output: dist"
  Write-Host "  3. Copy WEB3FORMS_ACCESS_KEY + ANTHROPIC_API_KEY from gamma, then Redeploy"
}
