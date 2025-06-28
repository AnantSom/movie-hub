# Dockerfile

# ---- Stage 1: Build the React App ----
# Use an official Node.js runtime as the base image.
# We are using a specific version for reproducibility. 'alpine' is a lightweight version.
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
# This is done first to leverage Docker's layer caching. If these files don't change,
# 'npm install' won't be run again on subsequent builds.
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Declare a build-time argument and set it as an environment variable
# This allows docker-compose to pass in the API key during the build
ARG VITE_TMDB_API_KEY
ENV VITE_TMDB_API_KEY=$VITE_TMDB_API_KEY

# Build the application for production
# This command runs the "build" script from your package.json
RUN npm run build


# ---- Stage 2: Serve the App with Nginx ----
# Use a lightweight Nginx image to serve the static files
FROM nginx:stable-alpine

# Copy the custom Nginx configuration file
# This is crucial for single-page applications (SPAs) like React
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static files from the 'builder' stage to the Nginx public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx in the foreground when the container starts
CMD ["nginx", "-g", "daemon off;"]