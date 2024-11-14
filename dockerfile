# Use the official Node.js 20 image
FROM node:20-alpine

# Install PostgreSQL client utilities (including pg_isready)
RUN apk add --no-cache postgresql-client

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies for the project
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Set the entrypoint to run the app
CMD ["npm", "run", "dev"]
