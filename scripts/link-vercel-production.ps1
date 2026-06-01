# Link this folder to the Vercel project for optimumscs.vercel.app
# Run after: npx vercel@41 login

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "Link to the Vercel project named 'optimumscs' (NOT optimumscs-gamma)" -ForegroundColor Yellow
Write-Host "unless you moved optimumscs.vercel.app to gamma.`n"

npx vercel@41 link

if (Test-Path ".vercel\project.json") {
  Write-Host "`nProject link file:" -ForegroundColor Cyan
  Get-Content ".vercel\project.json"
  Write-Host "`nUse these values as GitHub secrets VERCEL_ORG_ID and VERCEL_PROJECT_ID." -ForegroundColor Green
  Write-Host "Deploy manually: npx vercel@41 --prod`n"
} else {
  Write-Host "No .vercel/project.json found. Run vercel link again." -ForegroundColor Red
}
