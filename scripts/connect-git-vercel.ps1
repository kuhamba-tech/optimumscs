# Connect OptimumSCS GitHub repo to Vercel project (optimumscs.vercel.app)
#
# Prerequisites (run once in this folder):
#   npx vercel@41 login
#
# Usage:
#   powershell -File scripts/connect-git-vercel.ps1 -GitRepoUrl "https://github.com/YOUR-ORG/optimumscs.git"

param(
  [Parameter(Mandatory = $true)]
  [string]$GitRepoUrl
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "`n=== 1. Vercel login check ===" -ForegroundColor Cyan
$who = npx vercel@41 whoami 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "Not logged in. Run: npx vercel@41 login" -ForegroundColor Red
  Write-Host "Then run this script again.`n"
  exit 1
}
Write-Host "Logged in as: $who" -ForegroundColor Green

Write-Host "`n=== 2. Link Vercel project (choose 'optimumscs' for optimumscs.vercel.app) ===" -ForegroundColor Cyan
npx vercel@41 link

Write-Host "`n=== 3. Push code to OptimumSCS GitHub ===" -ForegroundColor Cyan
$hasRemote = git remote get-url optimumscs 2>$null
if (-not $hasRemote) {
  git remote add optimumscs $GitRepoUrl
  Write-Host "Added remote 'optimumscs' -> $GitRepoUrl"
} else {
  git remote set-url optimumscs $GitRepoUrl
  Write-Host "Updated remote 'optimumscs' -> $GitRepoUrl"
}

git push -u optimumscs main
if ($LASTEXITCODE -ne 0) {
  Write-Host "Git push failed. Check repo URL and GitHub access." -ForegroundColor Red
  exit 1
}

Write-Host "`n=== 4. Connect Git repo to Vercel (auto-deploy on push) ===" -ForegroundColor Cyan
npx vercel@41 git connect $GitRepoUrl

Write-Host "`n=== 5. Deploy production now ===" -ForegroundColor Cyan
npx vercel@41 --prod

Write-Host "`n=== 6. Environment variables ===" -ForegroundColor Cyan
Write-Host "In Vercel dashboard, copy from optimumscs-gamma to this project:"
Write-Host "  WEB3FORMS_ACCESS_KEY"
Write-Host "  ANTHROPIC_API_KEY"
Write-Host "Then: Deployments -> Redeploy`n"

Write-Host "=== 7. Verify ===" -ForegroundColor Cyan
Write-Host "powershell -File scripts/test-vercel-apis.ps1 -BaseUrl https://optimumscs.vercel.app`n"
