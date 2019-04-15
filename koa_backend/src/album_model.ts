import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface IAlbumModel extends mongoose.Document {
  id: string,
  name: string,
  url: string,
  image: string,
  releaseDate: string,
  numberOfTracks: number,
  artists: string[]
}
// database's data structure
const AlbumSchema = new Schema(
  {
    id: String,
    name: String,
    url: String,
    image: String,
    releaseDate: String,
    numberOfTracks: String,
    artists: []
  }
)

// export the new Schema so we could modify it using Node.js
export const Album = mongoose.model<IAlbumModel>('Album', AlbumSchema)
