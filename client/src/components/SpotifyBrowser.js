import React from 'react';

function AlbumList(props) {
    const albums = props.albums;
    const listItems = albums.map((album) =>
      <li key={album.id.toString()}>
        {album.name}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

class SpotifyBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        alert('searching for: ' + this.state.value);
        event.preventDefault();
      }

    render() {
        let searchResult = [{id:1, name: "my album number 1"},{id:2, name: "my album number 2"}];
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Search for an album
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                <AlbumList albums={searchResult}/>
            </form>
        );
    }
}

export default SpotifyBrowser;