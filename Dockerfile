# Use the official Node.js 18 image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create uploads directory
RUN mkdir -p uploads src/uploads

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "Waiting for database connection..."' >> /app/start.sh && \
    echo 'sleep 10' >> /app/start.sh && \
    echo 'echo "Setting up database..."' >> /app/start.sh && \
    echo 'cd /app/src/database && npx sequelize-cli db:migrate' >> /app/start.sh && \
    echo 'echo "Seeding database..."' >> /app/start.sh && \
    echo 'cd /app/src/database && npx sequelize-cli db:seed:all' >> /app/start.sh && \
    echo 'echo "Starting application..."' >> /app/start.sh && \
    echo 'cd /app && npm start' >> /app/start.sh && \
    chmod +x /app/start.sh

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD ["/app/start.sh"]
