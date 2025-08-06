# Thread Mini Website

A mobile-optimized social network web application that allows users to post threads with images, add comments, follow other users, like content, view threads, browse and search profiles.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git

### One Command Setup

```bash
docker-compose up --build
```

### Clean Build (No Cache)

```bash
# For a completely fresh build without cache
docker-compose build --no-cache
docker-compose up

# To completely reset everything including database data
docker-compose down -v
docker-compose up --build
```

The application will:
- Build and start all services (PostgreSQL, Redis, App)
- Automatically run database migrations
- Be available at http://localhost:4000

### Database Seeding (Required for test data)

After starting the containers, run these commands to seed the database with test data:

```bash
# Run all database migrations (if not already done)
docker exec thread_app npx sequelize-cli db:migrate

# Seed the database with all test data (users, threads, follows, likes, comments, notifications)
docker exec thread_app npx sequelize-cli db:seed:all
```

To reset the database and reseed:

```bash
# Remove all seeded data
docker exec thread_app npx sequelize-cli db:seed:undo:all

# Add fresh seed data
docker exec thread_app npx sequelize-cli db:seed:all
```

### Configuration

1. **Environment Setup**
   ```bash
   # Copy and edit the environment file
   cp .env.example .env
   ```

2. **Update your Cloudinary credentials in .env**
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

## Default User Accounts

You can use the following test accounts:

| Username    | Password       | Description |
| ----------- | -------------- | ----------- |
| hfayer0     | dN5&Ez\|%t(\`! | Test User 1 |
| bmunt1      | sY2<@jTV       | Test User 2 |
| dproudlock2 | gC6$#\`Py(\\Z7 | Test User 3 |

## Useful Commands

```bash
# Start in background
docker-compose up --build -d

# View logs
docker-compose logs -f app

# Stop all services
docker-compose down

# Restart just the app
docker-compose restart app

# Using npm scripts (alternative)
npm run setup    # Start everything in background
npm run down     # Stop all services
npm run logs     # View app logs
```

## Manual Setup (Without Docker)

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v13+)
- Redis (v6+)

### Steps
1. Clone and install dependencies
   ```bash
   git clone <repository-url>
   cd HCMUS-CSC13008-Thread-Mini-Website
   npm install
   ```

2. Configure environment
   ```bash
   cp .env.example .env
   # Edit .env with your database and service credentials
   ```

3. Setup database
   ```bash
   cd src/database
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

4. Start application
   ```bash
   npm start
   ```

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Sequelize ORM  
- **Cache/Sessions**: Redis
- **File Storage**: Cloudinary
- **Authentication**: Passport.js with local strategy
- **Template Engine**: Handlebars
- **Containerization**: Docker & Docker Compose

## Project Structure

- `/src` - Source code
  - `/controllers` - Application controllers
  - `/database` - Database configuration, models, migrations, seeders
  - `/routes` - Express routes
  - `/public` - Static assets
  - `/resources` - Frontend resources (views, SCSS)
  - `app.js` - Main application entry point

## Environment Variables

Configure these in your `.env` file:

- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key  
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret
- `SESSION_SECRET` - Secret key for sessions
- `MAILJET_API_KEY` - (Optional) For email functionality
- `MAILJET_SECRET_KEY` - (Optional) For email functionality
