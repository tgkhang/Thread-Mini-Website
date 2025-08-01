@echo off
echo Setting up Thread Mini Website with Docker...

REM Copy environment file
if not exist .env (
    copy .env.docker .env
    echo Created .env file from .env.docker template
    echo Please update the environment variables in .env if needed
)

REM Build and start services
echo Building and starting services...
docker-compose up -d --build

REM Wait for services to be ready
echo Waiting for services to be ready...
timeout /t 30 /nobreak > nul

REM Run database migrations and seeds
echo Setting up database...
docker-compose exec app npm run setup:db

echo.
echo Setup complete! 🎉
echo.
echo Services running:
echo - Application: http://localhost:4000
echo - PostgreSQL: localhost:5432
echo - Redis: localhost:6379
echo.
echo Useful commands:
echo - View logs: docker-compose logs -f app
echo - Stop services: docker-compose down
echo - Restart app: docker-compose restart app
echo.
