#!/bin/sh
set -e
echo "Running NANDA Registry migrations..."
node dist/migrate.js
echo "Starting NANDA Registry server..."
exec node dist/server.js
