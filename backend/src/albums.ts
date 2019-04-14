import express from 'express'
import mongoose from 'mongoose'
import spotifyApi, { SearchAlbumsResponse, AlbumObject } from './spotify-access'
import { Album, IAlbumModel } from './album_model'

const router = express.Router()

let connectionStringProvided = process.env.MONGO_CONNECTION_STRING !== undefined
mongoose.connect(
  process.env.MONGO_CONNECTION_STRING || "",
  { useNewUrlParser: true }
)

let db = mongoose.connection

db.once('open', () => console.log('connected to the database'))

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

router.get('/', function (req, res) {
  if(!connectionStringProvided) {
    res.status(500).json({ message: "Internal error"})
  }
  spotifyApi.clientCredentialsGrant()
    .then(data => {
      spotifyApi.setAccessToken(data.body['access_token'])
      return spotifyApi.searchAlbums(req.query.search)
    })
    .then((data: SearchAlbumsResponse) => {
      let noImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'

      let albums = data.body.albums.items.map((item) => {
        let album = new Album()
        album.id = item.id
        album.name = item.name
        album.url = item.uri
        album.image = item.images[0].url ? item.images[0].url : noImage
        album.releaseDate = item.release_date
        album.numberOfTracks = item.total_tracks
        album.artists = item.artists.map((artist) => artist.name)
        return album.save()
      })

      return Promise.all(albums)
    })
    .then((values: IAlbumModel[]) => res.status(200).json({ albums: values }))
    .catch((err: Error) => {
      console.log('An error while searching albums occurred: ', err)
      res.status(500).json({ message: "An error while searching albums occurred"})
    })
})

export default router
