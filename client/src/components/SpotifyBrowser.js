import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

function ListItem(props) {
    let album = props.album;
    return <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>{album.name}</Card.Title>
      <Card.Text>
        Authors: {album.artists.join(" & ")}
      </Card.Text>
      <Card.Link href={album.url}>Listen preview</Card.Link>
    </Card.Body>
  </Card>;
}

function AlbumList(props) {
    const albums = props.albums;
    const listItems = albums.map((album) =>
        <ListItem album={album}/>
    );
    return (
        <CardColumns>{listItems}</CardColumns>
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
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formSearchSpotifyAlbum">
                    <Form.Control 
                        type="text" 
                        placeholder="Enter album name"  
                        value={this.state.value} onChange={this.handleChange}
                    />
                </Form.Group>
                {this.state.searchedTerm ? <p>Results for query '{this.state.searchedTerm}':</p> : ''}
                <AlbumList albums={this.state.searchResult}/>
            </Form>
        );
    }
}

export default SpotifyBrowser;