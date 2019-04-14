# Spotify Album Browser

Spotify Album Browser is a basic MERN app to search for music albums in spotify throught the spotify-web-api

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Spotify Album Browser.

To install backend dependencies

```bash
cd backend && npm install
```
To install frontend dependencies

```bash
cd client && npm install
```

## Configurations

Create a .env file in backend directory and include the following keys

```env
NODE_PORT=<port> // avoid conflict with react app port
CLIENT_ID=<your_client_id>
CLIENT_SECRET=<your_client_secret>
MONGO_CONNECTION_STRING=mongodb://<hostname>/<database_name>
```

## Run

```bash
npm start
```
