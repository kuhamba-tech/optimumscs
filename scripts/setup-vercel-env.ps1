# Copy env vars from local .env to linked Vercel project (same as optimumscs-gamma)
# Run AFTER: npx vercel@41 login info@optimumscs.com
#            npx vercel@41 link   (select project optimumscs)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$envFile = Join-Path $root ".env"
if (-not (Test-Path $envFile)) {
  Write-Host "Missing .env file. Copy from .env.example and fill keys." -ForegroundColor Red
  exit 1
}

function Get-EnvValue($name) {
  Get-Content $envFile | ForEach-Object {
    if ($_ -match "^\s*$name\s*=\s*(.+)\s*$") { return $Matches[1].Trim() }
  }
  return $null
}

$who = npx vercel@41 whoami 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "Run: npx vercel@41 login info@optimumscs.com" -ForegroundColor Red
  exit 1
}

if (-not (Test-Path ".vercel\project.json")) {
  Write-Host "Run: npx vercel@41 link  (project: optimumscs)" -ForegroundColor Yellow
  npx vercel@41 link
}

$anthropic = Get-EnvValue "VITE_ANTHROPIC_API_KEY"
if (-not $anthropic) { $anthropic = Get-EnvValue "ANTHROPIC_API_KEY" }
$web3 = Get-EnvValue "WEB3FORMS_ACCESS_KEY"
if (-not $web3) { $web3 = Get-EnvValue "VITE_WEB3FORMS_KEY" }
$recruit = Get-EnvValue "VITE_WEB3FORMS_RECRUIT_KEY"

$vars = @()
if ($anthropic) { $vars += @{ Name = "ANTHROPIC_API_KEY"; Value = $anthropic } }
if ($web3) {
  $vars += @{ Name = "WEB3FORMS_ACCESS_KEY"; Value = $web3 }
  $vars += @{ Name = "VITE_WEB3FORMS_KEY"; Value = $web3 }
}
if ($recruit) { $vars += @{ Name = "VITE_WEB3FORMS_RECRUIT_KEY"; Value = $recruit } }

Write-Host "Adding $($vars.Count) variables to Production + Preview..." -ForegroundColor Cyan

foreach ($v in $vars) {
  foreach ($target in @("production", "preview")) {
    Write-Host "  $($v.Name) -> $target"
    $v.Value | npx vercel@41 env add $v.Name $target --force 2>&1
  }
}

Write-Host "`nRedeploy: npx vercel@41 --prod" -ForegroundColor Green
Write-Host "Or Vercel dashboard -> Deployments -> Redeploy`n"
