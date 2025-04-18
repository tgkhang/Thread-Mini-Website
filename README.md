# HCMUS-CSC13008-Thread-Mini-Website

A thread-based discussion platform built with Node.js, Express, and PostgreSQL.

The user interface is designed and optimized for mobile browsers.

## Demo

Live demo: [Demo Website](https://hcmus-csc13008-thread-mini-website.onrender.com/)

## Default User Accounts

You can use the following accounts to test the application:

| Username     | Password         |
|--------------|------------------|
| hfayer0      | dN5&Ez\|%t(\`!   |
| bmunt1       | sY2<@jTV         |
| dproudlock2  | gC6$#\`Py(\\Z7   |

For more accounts, check `/src/database/seeders/user.js`.

## Setup Instructions

### Prerequisites
- Node.js
- PostgreSQL
- Redis (for session management)

### Installation Steps

1. Clone the repository and install dependencies
   ```
   npm install
   ```

2. Database Configuration
   - Create a new database in PostgreSQL
   - Edit database connection settings in `/src/database/config.js`

3. Set up the database
   ```
   # Create tables
   cd src/database
   node db.js
   
   # Seed the database with initial data
   npx sequelize db:seed:all
   ```

4. Start the application local
   ```
   npm run start2
   ```

5. Access the application at `http://localhost:3000` (or your configured port)

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
  - `app.js` - Main application entry point
  - `app2.js` - Alternative application entry point

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
  - Cloudinary (image storage)
  
- **Others**:
  - Redis (session management)
  - Nodemon (development)
  - DOMPurify (security)
  - Express-validator
  - Multer (file uploads)
  - Node-Mailjet (email)
