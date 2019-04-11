var albumsHandler = require('./albums');

var express = require('express');
var app = express();

app.use('/albums', albumsHandler);

app.listen(process.env.NODE_PORT);