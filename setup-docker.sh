#!/bin/bash

echo "Setting up Thread Mini Website with Docker..."

# Copy environment file
if [ ! -f .env ]; then
    cp .env.docker .env
    echo "Created .env file from .env.docker template"
    echo "Please update the environment variables in .env if needed"
fi

# Build and start services
echo "Building and starting services..."
docker-compose up -d --build

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 30

# Run database migrations and seeds
echo "Setting up database..."
docker-compose exec app npm run setup:db

echo ""
echo "Setup complete! 🎉"
echo ""
echo "Services running:"
echo "- Application: http://localhost:4000"
echo "- PostgreSQL: localhost:5432"
echo "- Redis: localhost:6379"
echo ""
echo "Useful commands:"
echo "- View logs: docker-compose logs -f app"
echo "- Stop services: docker-compose down"
echo "- Restart app: docker-compose restart app"
echo ""
