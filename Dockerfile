# Use official Node.js LTS image
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY src ./src

# Build TypeScript to JavaScript
RUN npm run build

# Expose port
EXPOSE 5000

# Start backend
CMD ["npm", "start"]
