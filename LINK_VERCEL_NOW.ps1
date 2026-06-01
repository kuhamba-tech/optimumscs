# Step 1: Log in to Vercel CLI | Step 2: Connect GitHub + deploy
# Note: Logging in at vercel.com in the browser does NOT auth the CLI.
# You must complete: npx vercel@41 login (enter code from browser).
Set-Location $PSScriptRoot
Write-Host "CLI login required (browser dashboard login is separate).`n" -ForegroundColor Yellow
npx vercel@41 login
if ($LASTEXITCODE -ne 0) { exit 1 }
powershell -File ".\scripts\link-github-vercel.ps1"
