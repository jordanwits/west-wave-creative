#!/bin/bash
# Bash script to create .env.local file
# Run this script: bash create-env-file.sh

echo "Enter your admin password (or press Enter for default):"
read -s password

if [ -z "$password" ]; then
    password="admin123"
    echo "⚠️  WARNING: Using default password. Change this immediately!"
fi

echo "ADMIN_PASSWORD=$password" > .env.local

echo "✅ Created .env.local"
echo ""
echo "⚠️  IMPORTANT: Restart your dev server for changes to take effect!"
echo "   Stop your server (Ctrl+C) and run: pnpm dev"

