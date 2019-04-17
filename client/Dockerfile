FROM node:latest as builder
RUN mkdir -p /app
WORKDIR /app
COPY package.json .
RUN npm install
COPY .  .
ENV REACT_APP_SPOTIFY_API_LOCATION=http://localhost:9000/albums
RUN npm run build

## production environment ##
FROM nginx:1.15.2-alpine

# Copy Nginx conf
RUN rm -rf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/nginx.conf

# Copy react code
COPY --from=builder /app/build /var/www

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]