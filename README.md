# HCMUS-CSC13008-Thread-Mini-Website

A mobile-optimized social network web application that allows users to post threads with images, add comments, follow other users, like content, view threads, browse and search profiles.

## 🚀 Quick Start with Docker (Recommended)

The easiest way to run this project is using Docker Compose:

```bash
# Build and start all services
docker-compose up -d --build

# Run all database migrations
docker exec thread_app npx sequelize-cli db:migrate

# Seed the database with all test data (users, threads, follows, likes, comments, notifications)
docker exec thread_app npx sequelize-cli db:seed:all
```

Access the application at: **http://localhost:4000**

## Demo

Live demo: [Demo Website](https://hcmus-csc13008-thread-mini-website.onrender.com/)

## Default User Accounts

You can use the following test accounts after running the setup:

| Username    | Password       | Description |
| ----------- | -------------- | ----------- |
| hfayer0     | dN5&Ez\|%t(\`! | Test User 1 |
| bmunt1      | sY2<@jTV       | Test User 2 |
| dproudlock2 | gC6$#\`Py(\\Z7 | Test User 3 |

## Setup Instructions

### 🐳 Docker Setup (Recommended)

1. **Prerequisites**: Docker Desktop installed and running

2. **Quick Start**:

   ```bash
   # Clone the repository
   git clone <repository-url>
   cd HCMUS-CSC13008-Thread-Mini-Website

   # Build and start all services (PostgreSQL, Redis, Node.js app)
   docker-compose up -d --build

   # Run all database migrations
   docker exec thread_app npx sequelize-cli db:migrate

   # Seed the database with all test data (users, threads, follows, likes, comments, notifications)
   docker exec thread_app npx sequelize-cli db:seed:all
   ```

3. **Access**: Application available at http://localhost:4000

4. **Stop Services**:
   ```bash
   docker-compose down
   ```

### 🔧 Manual Setup (Without Docker)

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v13+)
- Redis (v6+)

### Installation Steps

1. Clone the repository and install dependencies

   ```bash
   git clone <repository-url>
   cd HCMUS-CSC13008-Thread-Mini-Website
   npm install
   ```

2. Database Configuration

   - Create a new PostgreSQL database named `thread`
   - Create a Redis instance
   - Create `.env` file based on `.env.example`

3. Set up the database

   ```bash
   # Run migrations to create tables
   npx sequelize-cli db:migrate

   # Seed the database with all test data (users, threads, follows, likes, comments, notifications)
   npx sequelize-cli db:seed:all
   ```

4. Start the application

   ```bash
   # With Redis (production mode)
   npm start

   # Without Redis (development mode)
   npm run start2
   ```

5. Access the application at `http://localhost:3000`

### Docker Services

This project includes the following containerized services:

- **PostgreSQL 15**: Database server (port 5432)
- **Redis 7**: Session storage and caching (port 6379)
- **Node.js 18**: Main application server (port 4000)

All services are orchestrated using Docker Compose with proper health checks and dependencies.

## Project Structure

- `/src` - Source code
  - `/controllers` - Application controllers
    - `authController.js` - Authentication logic
    - `indexController.js` - Main page controllers
    - `jwt.js` - JWT token handling
    - `mail.js` - Email functionality
    - `passport.js` - Passport.js configuration
    - `validator.js` - Input validation
  - `/database` - Database configuration and models
    - `/config` - Database connection configuration
    - `/migrations` - Database migrations
    - `/models` - Sequelize models
    - `/seeders` - Seed data for the database
    - `db.js` - Database initialization
  - `/routes` - Express routes
    - `authRouter.js` - Authentication routes
    - `indexRouter.js` - Main application routes
  - `/public` - Static assets
  - `/resources` - Frontend resources
  - `/uploads` - File upload directory
  - `app.js` - Main application entry point (with Redis)
  - `app2.js` - Development entry point (without Redis)
  - `setup-db.js` - Database setup script for Docker

## Technologies Used

- **Backend**:
  - Node.js + Express.js
  - Passport.js (authentication)
  - JWT (JSON Web Tokens)
  - Sequelize ORM
  - Bcrypt (password hashing)
- **Frontend**:
  - Express-Handlebars (templating)
  - SCSS/Sass
  - Bootstrap Icons
- **Database & Storage**:
  - PostgreSQL
  - Redis (session management)
  - Cloudinary (image storage)
- **Infrastructure**:
  - Docker & Docker Compose
  - Health checks and service dependencies
- **Others**:
  - Nodemon (development)
  - DOMPurify (security)
  - Express-validator
  - Multer (file uploads)
  - Node-Mailjet (email)
