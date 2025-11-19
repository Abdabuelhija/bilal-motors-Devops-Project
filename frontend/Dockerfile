# build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# serve stage
FROM nginx:alpine

# להעתיק את ה-build של Vite/React
COPY --from=build /app/dist /usr/share/nginx/html

# להחליף את קובץ הקונפיג של NGINX בקובץ שלנו
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
