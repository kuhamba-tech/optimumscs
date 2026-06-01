param(
  [Parameter(Mandatory = $true)]
  [string]$RepoUrl
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$remote = "optimumscs"
$existing = git remote get-url $remote 2>$null
if ($existing) {
  git remote set-url $remote $RepoUrl
  Write-Host "Updated remote '$remote' -> $RepoUrl"
} else {
  git remote add $remote $RepoUrl
  Write-Host "Added remote '$remote' -> $RepoUrl"
}

Write-Host "Pushing main..."
git push -u $remote main
if ($LASTEXITCODE -eq 0) {
  Write-Host "OK - OptimumSCS GitHub is up to date." -ForegroundColor Green
} else {
  Write-Host "Push failed. Create the empty repo on GitHub first, then retry." -ForegroundColor Red
  exit 1
}
