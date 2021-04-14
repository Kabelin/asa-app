#!/bin/sh

# Abort on any error (including if wait-for-it fails).
set -e

# Wait for db is ready
/usr/app/wait-for-it.sh "db:5432"

# Build app (can be used for production)
# npx sucrase ./src -d ./build --transforms imports

# Do the migrations when necessary
npx sequelize-cli db:migrate

# Remove unnecessary files
rm -r -f Dockerfile docker-compose.yml yarn.lock .dockerignore .git .gitignore

# Run the main container command.
exec "$@"
