var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Server up and running');
  });

app.listen(process.env.NODE_PORT);