# Point optimumscs.vercel.app at the NEW site (same as optimumscs-gamma)
# Prerequisites: npx vercel@41 login
#
# Usage:
#   powershell -File scripts/fix-optimumscs-domain.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$domain = "optimumscs.vercel.app"
$gammaHost = "optimumscs-gamma.vercel.app"

Write-Host "`n=== 1. Vercel login ===" -ForegroundColor Cyan
$who = npx vercel@41 whoami 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "Not logged in. Run:" -ForegroundColor Red
  Write-Host "  npx vercel@41 login`n"
  exit 1
}
Write-Host "OK: $who" -ForegroundColor Green

Write-Host "`n=== 2. Point $domain -> $gammaHost (new site) ===" -ForegroundColor Cyan
npx vercel@41 alias set $gammaHost $domain

if ($LASTEXITCODE -ne 0) {
  Write-Host "`nDomain may still be on the OLD project. In the browser:" -ForegroundColor Yellow
  Write-Host "  A) vercel.com -> project optimumscs -> Settings -> Domains -> Remove $domain"
  Write-Host "  B) project optimumscs-gamma -> Settings -> Domains -> Add $domain"
  Write-Host "  C) Run this script again`n"
  exit 1
}

Write-Host "`n=== 3. Wait and verify ===" -ForegroundColor Cyan
Start-Sleep -Seconds 20
powershell -File "$PSScriptRoot\test-vercel-apis.ps1" -BaseUrl "https://$domain"
