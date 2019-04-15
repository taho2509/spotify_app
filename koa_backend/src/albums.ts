import koa from 'koa'
import router from 'koa-router'
import mongoose from 'mongoose'
import spotifyApi, { SearchAlbumsResponse, AlbumObject } from './spotify-access'
import { Album, IAlbumModel } from './album_model'
import { isContext } from 'vm';

let connectionStringProvided = process.env.MONGO_CONNECTION_STRING !== undefined
mongoose.connect(
  process.env.MONGO_CONNECTION_STRING || "",
  { useNewUrlParser: true }
)

let db = mongoose.connection

db.once('open', () => console.log('connected to the database'))

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

let _ = new router();
_.get('/albums', async (ctx) => {
  if(!connectionStringProvided) {
    ctx.body = { message: "Internal error"};
    ctx.response.status = 500;
    return;
  }
  try{
    let data = await spotifyApi.clientCredentialsGrant();

    spotifyApi.setAccessToken(data.body['access_token']);
    let albumsResponse = await spotifyApi.searchAlbums(ctx.request.query.search);
  
    let noImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
  
    let albums = albumsResponse.body.albums.items.map((item) => {
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
  
    let albumModels = await Promise.all(albums);
    ctx.body = { albums: albumModels };
    ctx.response.status = 200;
  }
  catch(err) {
    ctx.body = { message: "An error while searching albums occurred"};
    ctx.response.status = 500;
  }
})

export default _.routes()
