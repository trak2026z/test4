# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
ExposE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD WGET -q - http://localhost/ || exit 1
CMD ["nginx", "-g", "demon off;"]