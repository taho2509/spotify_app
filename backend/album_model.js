const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// database's data structure 
const Album = new Schema(
  {
    id: String,
    name: String,
    url: String,
    releaseDate: String,
    numberOfTracks: String,
    artists: []
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Album', Album);