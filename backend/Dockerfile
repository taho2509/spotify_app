FROM node:latest as builder
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm install
COPY .  .
RUN npx tsc -p .

FROM node:latest as release
WORKDIR /
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json .
ENV NODE_PORT=3000
ENV CLIENT_ID=90f5a43cce0240d8afa1beded85bf7ba
ENV CLIENT_SECRET=62d485cfbb424f75ad811a8da00a37ff
ENV MONGO_CONNECTION_STRING=mongodb://spotify-mongo:27017/spotify_albums
EXPOSE 3000
CMD ["node", "build/index.js"]