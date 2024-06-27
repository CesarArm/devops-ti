# Stage 1: Build the Angular application
FROM node:20.12.2 AS build
WORKDIR /app
# Copia solo los archivos de definición de paquete para aprovechar la caché de capas de Docker
COPY package*.json ./
RUN npm install

# Comentario sobre la seguridad de copiar directorios
# Asegúrate de no copiar archivos innecesarios o sensibles al contenedor
COPY . .

# Comentario agregado para verificar la construcción de Angular
RUN npm run build -- --outputPath=./dist/devops-ti

# Stage 2: Serve the application from Nginx
FROM nginx:alpine
# Asegúrate de que la ruta desde donde copias coincida con la salida especificada en la construcción de Angular
COPY --from=build /app/dist/devops-ti /usr/share/nginx/html

# Expone el puerto 80 para acceder a Nginx
EXPOSE 80

# Comando para ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
