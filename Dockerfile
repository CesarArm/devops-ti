# Stage 1: Build the Angular application
FROM node:20.12.2 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application from Nginx
FROM nginx:alpine
COPY --from=build /app/dist/devops-ti /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
