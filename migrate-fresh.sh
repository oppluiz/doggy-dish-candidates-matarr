#!/bin/bash

# Migrate Fresh Script
# This script rolls back the last migration, deletes it, creates a new one, runs it, and generates types

set -e  # Exit on error

echo "🔄 Starting fresh migration process..."

# Step 1: Migrate down
echo "📉 Rolling back last migration..."
pnpm payload migrate:down

# Step 2: Find and delete the last migration files
echo "🗑️  Deleting last migration files..."
LAST_MIGRATION=$(ls -t src/migrations/*.ts 2>/dev/null | grep -v "index.ts" | head -n 1)
if [ -n "$LAST_MIGRATION" ]; then
    MIGRATION_BASE="${LAST_MIGRATION%.ts}"
    echo "   Deleting: $LAST_MIGRATION"
    rm -f "$LAST_MIGRATION"
    if [ -f "${MIGRATION_BASE}.json" ]; then
        echo "   Deleting: ${MIGRATION_BASE}.json"
        rm -f "${MIGRATION_BASE}.json"
    fi
else
    echo "   No migration files found to delete"
fi

# Step 3: Create new migration
echo "📝 Creating new migration..."
pnpm run migration

# Step 4: Run migration
echo "⬆️  Running migration..."
pnpm run migrate

# Step 5: Generate types
echo "🔧 Generating TypeScript types..."
pnpm run generate:types

echo "✅ Fresh migration complete!"
