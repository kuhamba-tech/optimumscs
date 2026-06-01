# Link kuhamba-tech/optimumscs to your Vercel project (run AFTER: npx vercel@41 login)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$repo = "https://github.com/kuhamba-tech/optimumscs.git"

Write-Host "`n=== Vercel login ===" -ForegroundColor Cyan
$who = npx vercel@41 whoami 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "Run first: npx vercel@41 login" -ForegroundColor Red
  Write-Host "Or use the browser guide: VERCEL_LINK_GITHUB.md`n"
  exit 1
}
Write-Host "OK: $who" -ForegroundColor Green

Write-Host "`n=== Link project (pick optimumscs or optimumscs-gamma) ===" -ForegroundColor Cyan
npx vercel@41 link

Write-Host "`n=== Connect GitHub repo ===" -ForegroundColor Cyan
npx vercel@41 git connect $repo

Write-Host "`n=== Production deploy ===" -ForegroundColor Cyan
npx vercel@41 --prod

Write-Host "`nIf optimumscs.vercel.app still shows the old site, see FIX_OPTIMUMSCS_DOMAIN.md`n" -ForegroundColor Yellow
powershell -File "$PSScriptRoot\test-vercel-apis.ps1" -BaseUrl "https://optimumscs.vercel.app"
