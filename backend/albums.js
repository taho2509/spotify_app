'use-strict';

var spotifyApi = require('./spotify-access');
var express = require('express');
var router = express.Router();


router.get('/:id([0-9a-z+]+)', function(req, res) {
  spotifyApi.searchAlbums(req.params.id)
  .then(data => {
    res.send(data.body);
  })
  .catch(err => {
    console.log("The error while searching albums occurred: ", err);
  })
});

//Routes will go here
module.exports = router;