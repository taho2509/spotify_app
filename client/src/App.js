import React, { Component, Fragment} from 'react'
import SpotifyBrowser from './components/SpotifyBrowser'

class App extends Component {
  render () {
    return <Fragment>
      <link
        rel='stylesheet'
        href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
        integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
        crossOrigin='anonymous'
      />
      <SpotifyBrowser/>
    </Fragment>
  }
}

export default App
