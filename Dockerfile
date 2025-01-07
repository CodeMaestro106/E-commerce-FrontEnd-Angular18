# Build stage
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Production stage
FROM nginx:alpine
COPY --from=build /dist/angular-19-e-commerce-frontend-app-with-ngrx /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
