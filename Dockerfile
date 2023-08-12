FROM node:16.19.0-alpine3.17 AS builder
# ENV NODE_ENV production
# Add a work directory
WORKDIR /app

RUN npm install -g @angular/cli

# Cache and Install dependencies
COPY package.json package-lock.json /app

RUN npm ci
# Copy app files
COPY . .

#RUN npm install -g @angular/cli
# Build the app
RUN npm run build
# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
# ENV NODE_ENV production
# Copy built assets from builder
RUN mkdir -p /usr/share/nginx/html
COPY --from=builder /app/dist/webapp /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]