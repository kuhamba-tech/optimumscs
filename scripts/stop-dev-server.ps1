# Free port 5173 (Vite dev server) on Windows
$port = 5173
$pids = netstat -ano | Select-String "LISTENING\s+(\d+)\s*$" | ForEach-Object {
  $line = $_.Line
  if ($line -match ":$port\s") {
    if ($line -match '\s+(\d+)\s*$') { [int]$Matches[1] }
  }
} | Sort-Object -Unique | Where-Object { $_ -gt 0 }

if (-not $pids) {
  Write-Host "No listener on port $port." -ForegroundColor Green
  exit 0
}

foreach ($processId in $pids) {
  try {
    $proc = Get-Process -Id $processId -ErrorAction SilentlyContinue
    if ($proc) {
      Write-Host "Stopping PID $processId ($($proc.ProcessName))..."
      Stop-Process -Id $processId -Force -ErrorAction Stop
    }
  } catch {
    Write-Host "Could not stop PID $processId : $_" -ForegroundColor Yellow
  }
}

Start-Sleep -Seconds 1
Write-Host "Port $port is free. Run: npm run dev" -ForegroundColor Green
