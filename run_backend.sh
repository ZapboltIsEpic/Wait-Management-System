#!/bin/bash

cd backend/backend_setup/

# This shell script is used for running the backend
# This is ran in the root directory of the project
# Note: Need to be in a bash terminal

set -e

# Adjusting UTF

fixturesFile="fixtures.json"

# Check if it exists
if [ ! -f "$fixturesFile" ]; then
    echo "Error: '$fixturesFile' not found."
    exit 1
fi

# Convert from UTF-16 to UTF-8
# iconv -f UTF-16 -t UTF-8 "$fixturesFile" > "${fixturesFile}.tmp" \
#   && mv "${fixturesFile}.tmp" "$fixturesFile" \

echo "Clearing database"
python manage.py flush || { echo "Clearing database via flush failed"; exit 1; }

# Migration
echo "Running migrations..."
python manage.py migrate || { echo "Migration failed"; exit 1; }

# Loading database
echo "Loading database..."
python manage.py loaddata fixtures.json || { echo "Loading database failed"; exit 1; }

# Running server
echo "Starting server... "
python manage.py runserver || exit 1
