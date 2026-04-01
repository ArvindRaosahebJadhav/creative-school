#!/bin/bash

# Quick Setup Script for School Management System Backend
# This script automates the setup process

echo "🚀 School Management System - Backend Setup"
echo "==========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. You need PostgreSQL for this project."
    echo "   Download from: https://www.postgresql.org/download/"
    exit 1
fi

echo "✓ PostgreSQL installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✓ Dependencies installed"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚙️  Setting up environment variables..."
    cp .env.example .env
    echo "✓ .env file created from .env.example"
    echo "   Please edit .env with your PostgreSQL credentials"
else
    echo "✓ .env file already exists"
fi
echo ""

# Check if school.db exists
if [ -f ../school.db ]; then
    echo "📊 Found school.db file. Ready to migrate!"
    echo ""
    echo "Run 'npm run migrate' to migrate from SQLite to PostgreSQL"
else
    echo "ℹ️  No school.db file found. This is optional."
fi
echo ""

echo "==========================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your PostgreSQL credentials"
echo "2. Create a PostgreSQL database: createdb creative-school"
echo "3. (Optional) Run migration: npm run migrate"
echo "4. Start server: npm run dev"
echo ""
echo "For more information, see README.md"
