# One-shot: log in to Vercel (browser) then move optimumscs.vercel.app to the new site
Set-Location $PSScriptRoot
Write-Host "Step 1: Log in to Vercel (complete in browser)...`n" -ForegroundColor Cyan
npx vercel@41 login
if ($LASTEXITCODE -ne 0) { exit 1 }
Write-Host "`nStep 2: Assign domain to new site...`n" -ForegroundColor Cyan
powershell -File ".\scripts\fix-optimumscs-domain.ps1"
