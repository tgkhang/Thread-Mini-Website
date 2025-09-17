# Thread Mini Website

A mobile-optimized social network web application built with Node.js/Express, PostgreSQL, and Redis. Users can post threads with images, comment, follow others, and interact through likes. The application features Handlebars templating, Cloudinary for image storage, and comprehensive containerization with Docker.

## ✨ Features

- **Thread Management**: Create, view, and manage threads with rich text and image support
- **Social Interactions**: Like, comment, follow/unfollow users
- **User Profiles**: Browse and search user profiles with activity history
- **Real-time Notifications**: Get notified about likes, comments, and follows
- **Image Handling**: Upload and display images via Cloudinary integration
- **Mobile-First Design**: Responsive UI optimized for mobile devices
- **Session Management**: Redis-backed sessions with secure authentication
- **XSS Protection**: Built-in security with DOMPurify sanitization

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git

### One Command Setup

```bash
docker-compose up --build
```

The application will:
- Build and start all services (PostgreSQL, Redis, Node.js app)
- Automatically run database migrations
- Be available at http://localhost:4000

### Alternative Quick Setup

```bash
npm run setup    # Start in background
npm run logs     # View application logs
```

### Clean Build (When Dependencies Change)

```bash
# For a completely fresh build without cache
docker-compose build --no-cache
docker-compose up

# To completely reset everything including database data
docker-compose down -v
docker-compose up --build
```

## 🗄️ Database Setup & Seeding

After starting the containers, seed the database with test data:

```bash
# Run all database migrations (if not already done)
docker exec thread_app npx sequelize-cli db:migrate

# Seed the database with test data (users, threads, follows, likes, comments, notifications)
docker exec thread_app npx sequelize-cli db:seed:all
```

### Resetting Database Data

```bash
# Remove all seeded data
docker exec thread_app npx sequelize-cli db:seed:undo:all

# Add fresh seed data
docker exec thread_app npx sequelize-cli db:seed:all
```

## 👤 Default User Accounts

Test with these seeded accounts:

| Username    | Password       | Description |
| ----------- | -------------- | ----------- |
| hfayer0     | dN5&Ez\|%t(\`! | Test User 1 |
| bmunt1      | sY2<@jTV       | Test User 2 |
| dproudlock2 | gC6$#\`Py(\\Z7 | Test User 3 |

## ⚙️ Configuration

### Environment Setup

1. **Copy environment template**
   ```bash
   cp .env.example .env
   ```

2. **Configure your Cloudinary credentials in .env**
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Required Environment Variables

- `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME` - PostgreSQL credentials
- `REDIS_URL` - Redis connection string
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - Cloudinary credentials
- `SESSION_SECRET` - Secret key for session encryption
- `MAILJET_API_KEY`, `MAILJET_SECRET_KEY` - (Optional) Email functionality

## 🐳 Docker Commands

```bash
# Development
npm run setup    # Start everything in background
npm run dev      # Start with build (equivalent to docker-compose up --build)
npm run down     # Stop all services
npm run logs     # View app logs

# Direct Docker commands
docker-compose up --build -d          # Start in background
docker-compose logs -f app            # Follow app logs
docker-compose restart app            # Restart just the app
docker-compose down -v                # Complete reset including volumes
```

## 🛠️ Development Commands

### Application Scripts

```bash
npm start          # Development with nodemon and debugging
npm run start:prod # Production mode without nodemon
```

### Frontend Development

```bash
npm run watch         # Watch SCSS files and compile automatically
npm run build:css     # Compile SCSS to CSS
npm run build:css:prod # Compile SCSS with compression
```

### Database Operations

```bash
# Run migrations
npx sequelize-cli db:migrate

# Seed database
npx sequelize-cli db:seed:all

# Undo all seeds
npx sequelize-cli db:seed:undo:all
```

## 🏗️ Architecture

### MVC Structure
- **Models** (`src/database/models/`): Sequelize models for User, Thread, Comment, Like, Follow, Notification
- **Controllers** (`src/controllers/`):
  - `authController.js` - Authentication logic
  - `indexController.js` - Main application logic
  - `image.js` - Cloudinary image handling
  - `passport.js` - Passport.js configuration
  - `validator.js` - Input validation utilities
- **Views** (`src/resources/views/`): Handlebars templates with layouts and partials
- **Routes** (`src/routes/`): Express routing separated by functionality

### Key Components
- **Database Layer**: PostgreSQL with Sequelize ORM, comprehensive migrations and seeders
- **Session Management**: Redis-backed sessions with 20-minute expiration
- **Image Handling**: Cloudinary integration for image uploads and storage
- **Authentication**: Passport.js local strategy with bcrypt password hashing
- **Security**: XSS protection with DOMPurify, input validation
- **Styling**: SCSS compilation with real-time watching

### Docker Architecture
Three-service architecture with health checks and persistent volumes:
- **PostgreSQL**: Database service with persistent data
- **Redis**: Session store and caching layer
- **Node.js App**: Main application with automatic dependency waiting

## 📊 Database Schema

### Core Entity Relationships
- **Users** ↔ **Threads** (one-to-many)
- **Users** ↔ **Comments** (one-to-many)
- **Users** ↔ **Likes** (one-to-many)
- **Users** ↔ **Follows** (many-to-many self-referential)
- **Users** ↔ **Notifications** (one-to-many)
- **Threads** ↔ **Comments** (one-to-many)
- **Threads** ↔ **Likes** (one-to-many)

## 🔧 Technology Stack

**Backend:**
- Node.js & Express.js
- PostgreSQL with Sequelize ORM
- Redis for sessions and caching
- Passport.js for authentication

**Frontend:**
- Handlebars template engine with helpers
- SCSS with Sass compilation
- Bootstrap Icons
- Mobile-first responsive design

**Infrastructure:**
- Docker & Docker Compose
- Cloudinary for image storage
- Swagger for API documentation

**Security & Validation:**
- DOMPurify for XSS protection
- Express Validator
- bcrypt for password hashing
- JSON Web Tokens

## 📁 Project Structure

```
src/
├── controllers/          # Application logic and utilities
│   ├── authController.js     # Authentication handling
│   ├── indexController.js    # Main app features (large file)
│   ├── image.js             # Cloudinary integration
│   ├── passport.js          # Passport.js configuration
│   ├── validator.js         # Input validation
│   └── handlebarsHelper.js  # Template helpers
├── database/            # Database layer
│   ├── models/             # Sequelize models
│   ├── migrations/         # Database migrations
│   └── seeders/           # Test data seeders
├── routes/              # Express routing
│   ├── authRouter.js       # Authentication routes
│   └── indexRouter.js      # Main application routes
├── resources/           # Frontend resources
│   ├── views/             # Handlebars templates
│   └── scss/              # SCSS stylesheets
├── public/              # Static assets
├── config/              # Configuration files
└── app.js              # Main application entry point
```

## 🚀 Manual Setup (Without Docker)

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v13+)
- Redis (v6+)

### Steps
1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd HCMUS-CSC13008-Thread-Mini-Website
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database and service credentials
   ```

3. **Setup database**
   ```bash
   cd src/database
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

4. **Start services**
   ```bash
   # Start PostgreSQL and Redis services manually
   # Then start the application
   npm start
   ```

## 📝 API Documentation

Swagger API documentation is available when running the application. The configuration is located in `src/config/swagger.js`.

## 🧪 Testing

Currently, no formal test suite is configured. Test data is provided through comprehensive database seeders that create:
- Sample users with varied profiles
- Threads with different content types
- Social interactions (follows, likes, comments)
- Notification examples

## 🔒 Security Features

- **XSS Protection**: DOMPurify sanitization of user inputs
- **Password Security**: bcrypt hashing with salt
- **Session Security**: Redis-backed sessions with expiration
- **Input Validation**: Comprehensive validation with express-validator
- **Authentication**: Secure Passport.js local strategy

## 🎨 Styling & UI

- **Mobile-First Design**: Optimized for mobile devices with responsive breakpoints
- **SCSS Architecture**: Modular stylesheets with compilation pipeline
- **Bootstrap Icons**: Comprehensive icon library
- **Real-time Compilation**: File watching for development

## 📈 Performance Features

- **Redis Caching**: Session storage and potential caching layer
- **Image Optimization**: Cloudinary handling for efficient image delivery
- **Database Indexing**: Proper indexing through Sequelize migrations
- **Session Management**: 20-minute session expiration for security and performance

---

**Development Status**: Active development with comprehensive Docker setup and database seeding for easy testing and development.