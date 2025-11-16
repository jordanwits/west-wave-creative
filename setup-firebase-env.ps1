# PowerShell script to set up Firebase environment variables
# Run this script: .\setup-firebase-env.ps1

$envFile = ".env.local"

Write-Host "Setting up Firebase environment variables..." -ForegroundColor Cyan
Write-Host ""

# Read the service account key JSON
Write-Host "Paste your Firebase service account key JSON (the entire JSON object):" -ForegroundColor Yellow
Write-Host "Press Enter after pasting, then press Ctrl+Z and Enter again to finish:" -ForegroundColor Yellow
Write-Host ""

$jsonInput = @()
$line = ""
while ($true) {
    $line = Read-Host
    if ($line -eq $null) { break }
    $jsonInput += $line
}

$jsonString = $jsonInput -join "`n"

if ([string]::IsNullOrWhiteSpace($jsonString)) {
    Write-Host "❌ No JSON provided. Exiting." -ForegroundColor Red
    exit 1
}

# Validate JSON
try {
    $jsonObject = $jsonString | ConvertFrom-Json
    Write-Host "✅ Valid JSON detected" -ForegroundColor Green
} catch {
    Write-Host "❌ Invalid JSON format. Please check your service account key." -ForegroundColor Red
    exit 1
}

# Convert to single-line JSON and escape properly
$singleLineJson = ($jsonString -replace "`r`n", " " -replace "`n", " " -replace "`r", " " -replace '\s+', ' ').Trim()

# Read existing .env.local if it exists
$existingContent = ""
if (Test-Path $envFile) {
    $existingContent = Get-Content $envFile -Raw
    Write-Host "📝 Found existing .env.local file" -ForegroundColor Yellow
}

# Remove old FIREBASE_SERVICE_ACCOUNT_KEY if exists
$lines = $existingContent -split "`n" | Where-Object { 
    $_ -notmatch '^\s*FIREBASE_SERVICE_ACCOUNT_KEY\s*=' 
}

# Add the new Firebase service account key
$firebaseLine = "FIREBASE_SERVICE_ACCOUNT_KEY='$singleLineJson'"

# Combine existing content (without old Firebase key) with new Firebase key
$newContent = ($lines | Where-Object { $_.Trim() -ne "" }) -join "`n"
if ($newContent) {
    $newContent += "`n"
}
$newContent += $firebaseLine

# Write to file
Set-Content -Path $envFile -Value $newContent -Force

Write-Host ""
Write-Host "✅ Firebase environment variable added to .env.local" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT: Restart your dev server for changes to take effect!" -ForegroundColor Yellow
Write-Host "   1. Stop your server (Ctrl+C)" -ForegroundColor Yellow
Write-Host "   2. Run: pnpm dev" -ForegroundColor Yellow
Write-Host ""

