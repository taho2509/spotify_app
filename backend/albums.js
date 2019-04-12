'use-strict';

const mongoose = require('mongoose');

var spotifyApi = require('./spotify-access');
var express = require('express');
var router = express.Router();

const Album = require('./album_model');

mongoose.connect(
  process.env.MONGO_CONNECTION_STRING,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

router.get('/', function(req, res) {
  spotifyApi.searchAlbums(req.query.search)
  .then(data => {
    //res.send(data.body);

    let noImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";

    let albums = data.body.albums.items.map((item) => {

      let album  = new Album();
      album.id = item.id;
      album.name = item.name;
      album.url = item.uri;
      album.image = item.images[0].url ? item.images[0].url : noImage;
      album.releaseDate = item.release_date;
      album.numberOfTracks = item.total_tracks;
      album.artists = item.artists.map((artist) => artist.name);
      return album.save();
    });

    return Promise.all(albums);
  })
  .then((values) => res.json({ success: true , albums: values}))
  .catch(err => {
    console.log("An error while searching albums occurred: ", err);
    res.json({ success: false, error: err});
  })
});

//Routes will go here
module.exports = router;