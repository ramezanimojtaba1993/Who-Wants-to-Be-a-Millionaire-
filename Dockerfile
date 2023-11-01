# Stage 1: Build the Angular project
FROM node:18.10-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./
# Install dependencies
RUN npm install -g npm@9.7.2
RUN npm install
# Copy project files
COPY . /app

# Build the Angular application
RUN npm run build



# Stage 2: Publish the Angular application with Nginx
FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*
RUN mkdir /usr/share/nginx/html/app

# Copy the built Angular files from the builder stage to Nginx
COPY --from=builder /app/dist/ng-milionaire/ /usr/share/nginx/html/app
COPY nginx.conf /etc/nginx/nginx.conf




# Expose port 80
EXPOSE 80


# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

