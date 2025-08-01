#!/bin/bash
set -e

echo "Creating database: thread"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    SELECT 'Database thread already exists' WHERE EXISTS (SELECT FROM pg_database WHERE datname = 'thread');
EOSQL

echo "Database initialization completed"
