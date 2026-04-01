# PostgreSQL Setup & Migration Script
# For Windows PowerShell
# This script will find PostgreSQL, create the database, and run migration

Write-Host "🚀 PostgreSQL Setup & Migration Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Common PostgreSQL installation paths on Windows
$postgresqlPaths = @(
    "C:\Program Files\PostgreSQL\15\bin\psql",
    "C:\Program Files\PostgreSQL\14\bin\psql",
    "C:\Program Files\PostgreSQL\13\bin\psql",
    "C:\Program Files (x86)\PostgreSQL\15\bin\psql",
    "C:\Program Files (x86)\PostgreSQL\14\bin\psql",
    "C:\Program Files (x86)\PostgreSQL\13\bin\psql"
)

# Find psql
$psqlPath = $null
foreach ($path in $postgresqlPaths) {
    if (Test-Path $path) {
        $psqlPath = $path
        break
    }
}

if ($null -eq $psqlPath) {
    Write-Host "❌ PostgreSQL not found in standard installation paths" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install PostgreSQL from: https://www.postgresql.org/download/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or try one of these:" -ForegroundColor Yellow
    Write-Host "1. Add PostgreSQL bin folder to your system PATH" -ForegroundColor White
    Write-Host "2. Update the paths in this script" -ForegroundColor White
    exit 1
}

Write-Host "✓ Found PostgreSQL at: $psqlPath" -ForegroundColor Green
Write-Host ""

# Test PostgreSQL connection
Write-Host "Testing PostgreSQL connection..." -ForegroundColor Cyan
try {
    $output = & $psqlPath -U postgres -c "SELECT version();" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ PostgreSQL connection successful" -ForegroundColor Green
    }
    else {
        Write-Host "⚠️  Connection test output: $output" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Could not test connection: $_" -ForegroundColor Yellow
}

Write-Host ""

# Prompt for PostgreSQL password if needed
$password = Read-Host "Enter PostgreSQL password (default: press Enter if no password)"
if ([string]::IsNullOrEmpty($password)) {
    $password = ""
}

# Create database
Write-Host "Creating database 'creative-school'..." -ForegroundColor Cyan

if ([string]::IsNullOrEmpty($password)) {
    & $psqlPath -U postgres -h localhost -c "CREATE DATABASE IF NOT EXISTS ""creative-school"" WITH ENCODING 'UTF8';" 2>&1
}
else {
    $env:PGPASSWORD = $password
    & $psqlPath -U postgres -h localhost -c "CREATE DATABASE IF NOT EXISTS ""creative-school"" WITH ENCODING 'UTF8';" 2>&1
    $env:PGPASSWORD = ""
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database created successfully" -ForegroundColor Green
}
else {
    Write-Host "⚠️  Database may already exist (this is OK)" -ForegroundColor Yellow
}

Write-Host ""

# Run migration
Write-Host "Running migration..." -ForegroundColor Cyan
npm run migrate

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Migration completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. npm run dev      (Start the development server)" -ForegroundColor White
    Write-Host "2. Open http://localhost:5000/api/health in your browser" -ForegroundColor White
}
else {
    Write-Host ""
    Write-Host "❌ Migration failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Check if PostgreSQL is running" -ForegroundColor White
    Write-Host "2. Verify .env file has correct DB_PASSWORD" -ForegroundColor White
    Write-Host "3. Check if school.db file exists" -ForegroundColor White
}
