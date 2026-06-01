# Step 1: Log in to Vercel | Step 2: Connect GitHub repo to Vercel
Set-Location $PSScriptRoot
Write-Host "Opening Vercel login... Complete sign-in in the browser.`n" -ForegroundColor Cyan
npx vercel@41 login
if ($LASTEXITCODE -ne 0) { exit 1 }
powershell -File ".\scripts\link-github-vercel.ps1"
