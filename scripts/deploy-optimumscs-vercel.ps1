# Deploy kuhamba-tech/optimumscs to Vercel (optimumscs-8250 account)
# Run in YOUR terminal after browser GitHub connect, OR complete CLI login here.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$repo = "https://github.com/kuhamba-tech/optimumscs.git"

Write-Host "`n=== Step 1: Vercel CLI login (EMAIL only — not --github) ===" -ForegroundColor Cyan
Write-Host "Account: info@optimumscs.com (optimumscs-8250)"
Write-Host "If GitHub login failed before, use: npx vercel@41 login info@optimumscs.com`n"
npx vercel@41 login info@optimumscs.com
if ($LASTEXITCODE -ne 0) {
  Write-Host "Or connect GitHub in browser only: https://vercel.com/account/settings/authentication" -ForegroundColor Yellow
  Write-Host "Then skip CLI and use https://vercel.com/new to import the repo." -ForegroundColor Yellow
  exit 1
}

Write-Host "`n=== Step 2: Link project (name: optimumscs) ===" -ForegroundColor Cyan
Write-Host "Select your scope (optimumscs-8250) and project name optimumscs`n"
npx vercel@41 link

Write-Host "`n=== Step 3: Connect GitHub repo ===" -ForegroundColor Cyan
npx vercel@41 git connect $repo

Write-Host "`n=== Step 4: Production deploy ===" -ForegroundColor Cyan
npx vercel@41 --prod

Write-Host "`n=== Step 5: Verify ===" -ForegroundColor Cyan
Start-Sleep -Seconds 15
powershell -File "$PSScriptRoot\test-vercel-apis.ps1" -BaseUrl "https://optimumscs.vercel.app"
