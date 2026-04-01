# PostgreSQL & Migration Verification Script
# Run this to test if everything is configured correctly

Write-Host "🔍 PostgreSQL & Migration Verification" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$issues = @()
$warnings = @()
$success = @()

# Check 1: Node.js
Write-Host "Checking Node.js..." -ForegroundColor Gray
try {
    $nodeVersion = node --version 2>&1
    $success += "✓ Node.js $nodeVersion found"
} catch {
    $issues += "❌ Node.js not installed or not in PATH"
}

# Check 2: npm
Write-Host "Checking npm..." -ForegroundColor Gray
try {
    $npmVersion = npm --version 2>&1
    $success += "✓ npm $npmVersion found"
} catch {
    $issues += "❌ npm not installed or not in PATH"
}

# Check 3: .env file
Write-Host "Checking .env file..." -ForegroundColor Gray
if (Test-Path ".env") {
    $success += "✓ .env file exists"
    
    # Check .env contents
    $envContent = Get-Content .env -Raw
    if ($envContent -like "*DB_NAME*creative-school*") {
        $success += "✓ DB_NAME=creative-school configured"
    } else {
        $warnings += "⚠️  DB_NAME not set to creative-school"
    }
    
    if ($envContent -like "*DB_PASSWORD*Arun@123*") {
        $success += "✓ DB_PASSWORD=Arun@123 configured"
    } else {
        $warnings += "⚠️  DB_PASSWORD may not match"
    }
} else {
    $issues += "❌ .env file not found"
}

# Check 4: package.json
Write-Host "Checking package.json..." -ForegroundColor Gray
if (Test-Path "package.json") {
    $pkgJson = Get-Content package.json | ConvertFrom-Json
    if ($pkgJson.scripts.migrate) {
        $success += "✓ migrate script found in package.json"
    } else {
        $warnings += "⚠️  migrate script not found in package.json"
    }
} else {
    $issues += "❌ package.json not found"
}

# Check 5: migrate.js
Write-Host "Checking migrate.js..." -ForegroundColor Gray
if (Test-Path "migrate.js") {
    $success += "✓ migrate.js script exists"
} else {
    $issues += "❌ migrate.js not found"
}

# Check 6: school.db
Write-Host "Checking school.db..." -ForegroundColor Gray
$dbPaths = @(".\school.db", "..\school.db")
$dbFound = $false

foreach ($path in $dbPaths) {
    if (Test-Path $path) {
        $dbSize = (Get-Item $path).Length
        $success += "✓ school.db found at: $path ($dbSize bytes)"
        $dbFound = $true
        break
    }
}

if (-not $dbFound) {
    $warnings += "⚠️  school.db not found (migration will create empty PostgreSQL database)"
}

# Check 7: Models, Controllers, Routes
Write-Host "Checking backend files..." -ForegroundColor Gray
$requiredFiles = @(
    "src/models/User.ts",
    "src/models/Gallery.ts",
    "src/models/Teacher.ts",
    "src/controllers/auth.controller.js",
    "src/routes/auth.routes.js",
    "src/middleware/auth.middleware.js"
)

$missingFiles = @()
foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -eq 0) {
    $success += "✓ All required backend files present"
} else {
    $issues += "❌ Missing files: $($missingFiles -join ', ')"
}

# Check 8: node_modules
Write-Host "Checking dependencies..." -ForegroundColor Gray
if (Test-Path "node_modules") {
    $success += "✓ node_modules exists"
} else {
    $warnings += "⚠️  node_modules not found (run: npm install)"
}

Write-Host ""
Write-Host "===== RESULTS =====" -ForegroundColor Cyan
Write-Host ""

if ($success.Count -gt 0) {
    Write-Host "✅ SUCCESSES:" -ForegroundColor Green
    foreach ($item in $success) {
        Write-Host "   $item" -ForegroundColor Green
    }
    Write-Host ""
}

if ($warnings.Count -gt 0) {
    Write-Host "⚠️  WARNINGS:" -ForegroundColor Yellow
    foreach ($item in $warnings) {
        Write-Host "   $item" -ForegroundColor Yellow
    }
    Write-Host ""
}

if ($issues.Count -gt 0) {
    Write-Host "❌ ISSUES:" -ForegroundColor Red
    foreach ($item in $issues) {
        Write-Host "   $item" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Please fix the issues above before running migration." -ForegroundColor Red
    exit 1
} else {
    Write-Host "✅ All checks passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run:" -ForegroundColor Cyan
    Write-Host "   npm run migrate" -ForegroundColor White
    Write-Host "   npm run dev" -ForegroundColor White
}
