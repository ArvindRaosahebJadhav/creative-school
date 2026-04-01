# PowerShell setup script for School Management System Backend
# Run this in PowerShell as Administrator

Write-Host "🚀 School Management System - Backend Setup (Windows)" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js..."
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed" -ForegroundColor Red
    Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

$nodeVersion = node --version
Write-Host "✓ Node.js $nodeVersion" -ForegroundColor Green

# Check if PostgreSQL is installed
Write-Host "Checking PostgreSQL..."
if (!(Get-Command psql -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  PostgreSQL is not installed" -ForegroundColor Yellow
    Write-Host "   Download from: https://www.postgresql.org/download/" -ForegroundColor Yellow
    Write-Host "   You can continue, but migration will require PostgreSQL" -ForegroundColor Yellow
}
else {
    Write-Host "✓ PostgreSQL installed" -ForegroundColor Green
}

Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Check if .env exists
if (!(Test-Path ".env")) {
    Write-Host "⚙️  Setting up environment variables..." -ForegroundColor Cyan
    Copy-Item ".env.example" ".env"
    Write-Host "✓ .env file created" -ForegroundColor Green
    Write-Host "   Please edit .env with your PostgreSQL credentials" -ForegroundColor Yellow
}
else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}

Write-Host ""

# Check if school.db exists
if (Test-Path "../school.db") {
    Write-Host "📊 Found school.db file" -ForegroundColor Green
    Write-Host "   Ready to migrate from SQLite to PostgreSQL" -ForegroundColor Green
    Write-Host ""
    Write-Host "   Run: npm run migrate" -ForegroundColor Cyan
}
else {
    Write-Host "ℹ️  No school.db file found (optional)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Create PostgreSQL database: psql -U postgres" -ForegroundColor White
Write-Host "   Then: CREATE DATABASE ""creative-school"";" -ForegroundColor White
Write-Host "2. Edit .env with your PostgreSQL credentials" -ForegroundColor White
Write-Host "3. (Optional) Run migration: npm run migrate" -ForegroundColor White
Write-Host "4. Start server: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "📖 For more information, see QUICK_START.md" -ForegroundColor Cyan
