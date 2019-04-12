var albumsHandler = require('./albums');

var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/albums', albumsHandler);

app.listen(process.env.NODE_PORT);