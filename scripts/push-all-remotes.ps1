# Push main to origin (kuhamba-tech) and optimumscs remote if configured
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "Pushing to origin (kuhamba-tech)..." -ForegroundColor Cyan
git push origin main
if ($LASTEXITCODE -ne 0) { exit 1 }

$hasOpt = git remote get-url optimumscs 2>$null
if ($hasOpt) {
  Write-Host "Pushing to optimumscs ($hasOpt)..." -ForegroundColor Cyan
  git push optimumscs main
  if ($LASTEXITCODE -ne 0) { exit 1 }
} else {
  Write-Host "No 'optimumscs' remote. Add with:" -ForegroundColor Yellow
  Write-Host '  powershell -File scripts/push-to-optimumscs-github.ps1 -RepoUrl "https://github.com/YOUR-ORG/optimumscs.git"'
}

Write-Host "Done." -ForegroundColor Green
