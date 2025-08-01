# Docker Setup for Thread Mini Website

This project has been enhanced with Docker support for easy deployment and development.

## 🚀 Quick Start

### Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

### One-Command Setup

**Windows:**

```bash
setup-docker.bat
```

**Linux/macOS:**

```bash
chmod +x setup-docker.sh
./setup-docker.sh
```

**Manual Setup:**

```bash
# Copy environment file
cp .env.docker .env

# Start all services
docker-compose up -d --build

# Wait for services to start, then setup database
docker-compose exec app npm run setup:db
```

After setup, access the application at: **http://localhost:4000**

## 🐳 Services

| Service    | Port | Description              |
| ---------- | ---- | ------------------------ |
| Web App    | 4000 | Main Node.js application |
| PostgreSQL | 5432 | Database server          |
| Redis      | 6379 | Session storage          |

## 📋 Available Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Restart app only
docker-compose restart app

# Run database migrations
docker-compose exec app npm run setup:db

# Access app container shell
docker-compose exec app sh

# Access database
docker-compose exec postgres psql -U postgres -d thread
```

## 🔧 Configuration

### Environment Variables

Update `.env` file for your environment:

```env
# Database
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=123
DB_NAME=thread

# Redis
REDIS_URL=redis://redis:6379

# Session
SESSION_SECRET=your_super_secret_session_key

# Cloudinary (for image storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Production Deployment

For production, use the production compose file:

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

## 🗄️ Database

- **Automatic Setup**: Database tables and seed data are created automatically
- **Persistent Storage**: Data persists between container restarts
- **Access**: Connect to PostgreSQL at `localhost:5432`

### Manual Database Operations

```bash
# Run migrations
docker-compose exec app npx sequelize-cli db:migrate

# Run seeds
docker-compose exec app npx sequelize-cli db:seed:all

# Undo last migration
docker-compose exec app npx sequelize-cli db:migrate:undo
```

## 🔄 Redis Session Storage

- Redis automatically handles session storage
- Sessions persist between app restarts
- No external Redis service needed

## 📁 File Storage

- **Local Development**: Files stored in `./uploads` directory
- **Cloudinary**: Images can be stored in Cloudinary (configure in `.env`)
- **Persistent Volumes**: Upload data persists between container restarts

## 🐛 Troubleshooting

### Services not starting

```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs

# Restart specific service
docker-compose restart [service_name]
```

### Database connection issues

```bash
# Check if PostgreSQL is ready
docker-compose exec postgres pg_isready -U postgres

# Recreate database
docker-compose down -v
docker-compose up -d --build
```

### Port conflicts

If ports are already in use, modify them in `docker-compose.yml`:

```yaml
ports:
  - "4001:4000" # Use port 4001 instead of 4000
```

### Clear all data

```bash
# Remove all containers and volumes
docker-compose down -v
docker system prune -a
```

## 📊 Health Monitoring

The application includes health checks:

- **App Health**: http://localhost:4000/health
- **Container Status**: `docker-compose ps`

## 🔒 Security Notes

- Change default passwords in production
- Update `SESSION_SECRET` with a strong random string
- Use environment-specific `.env` files
- Don't commit sensitive data to version control

## 📈 Performance

- **Development**: Uses nodemon for auto-restart
- **Production**: Optimized build with multi-stage Docker
- **Caching**: Redis handles session caching efficiently
- **Volumes**: Node modules cached for faster rebuilds
