import React from 'react';
import axios from 'axios';

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
        this.state = {
            value: '',
            searchedTerm: '',
            searchResult: [],
            error: false,
            errorMessage: "",
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();
        const data = {
            search: this.state.value
        }
        axios.get("http://localhost:3001/albums",{ params: data})
        .then(response => {
            response.data.success ?
            this.setState({
                value: '',
                searchResult: response.data.albums,
                searchedTerm: this.state.value,
                error: false,
                errorMessage: "",
            }) :
            this.setState({
                value: this.state.value,
                searchResult: [],
                searchedTerm: '',
                error: true,
                errorMessage: response.data.error,
            });
        })
        .catch(function (error) {
            console.log(error);
            this.setState({
                value: this.state.value,
                searchResult: [],
                searchedTerm: '',
                error: true,
                errorMessage: error,
            });
        });
      }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Search for an album
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                {this.state.searchedTerm ? <p>Results for query '{this.state.searchedTerm}':</p> : ''}
                <AlbumList albums={this.state.searchResult}/>
            </form>
        );
    }
}

export default SpotifyBrowser;