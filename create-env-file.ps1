# PowerShell script to create .env.local file
# Run this script: .\create-env-file.ps1

$envFile = ".env.local"
$password = Read-Host "Enter your admin password (or press Enter for default)"

if ([string]::IsNullOrWhiteSpace($password)) {
    $password = "admin123"
    Write-Host "Using default password: admin123" -ForegroundColor Yellow
    Write-Host "⚠️  WARNING: Change this password immediately!" -ForegroundColor Red
}

$content = "ADMIN_PASSWORD=$password"

Set-Content -Path $envFile -Value $content -Force

Write-Host "✅ Created $envFile" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT: Restart your dev server for changes to take effect!" -ForegroundColor Yellow
Write-Host "   Stop your server (Ctrl+C) and run: pnpm dev" -ForegroundColor Yellow

