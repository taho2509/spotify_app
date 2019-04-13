// @ts-ignore
import SpotifyWebApi from 'spotify-web-api-node'
import { AlbumObjectFull } from 'spotify-web-api-node-typings'

export interface AlbumObject extends AlbumObjectFull {
  total_tracks: number
}

export interface SearchAlbumsResponse {
  body: {
    albums: {
      items: AlbumObject[]
    }
  }
}

const spotifyApi: {
  clientCredentialsGrant: () => Promise<{
    body: {
      access_token: string
    }
  }>,
  setAccessToken: (accessToken: string) => void,
  searchAlbums: (query: string) => Promise<SearchAlbumsResponse>,
} = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
})

export default spotifyApi
