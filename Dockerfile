# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS build
WORKDIR /app

# Instalacja zależności
COPY package*.json tsconfig.json ./
RUN npm ci

# Kopiowanie źródeł i build
COPY . .
RUN npm run build

# Etap runtime
FROM nginx:alpine AS runtime
WORKDIR /usr/share/nginx/html

# Doinstaluj curl do healthchecka
RUN apk add --no-cache curl

COPY --from=build /app/dist ./

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
