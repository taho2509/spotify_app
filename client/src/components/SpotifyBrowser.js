import React, { Fragment }  from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert';

function Album(props) {
    let album = props.album;
    return <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={album.image} />
    <Card.Body>
      <Card.Title>{album.name}</Card.Title>
      <Card.Text>
        Artists: {album.artists.join(" & ")}
      </Card.Text>
      <Card.Link href={album.url}>Open in spotify</Card.Link>
    </Card.Body>
  </Card>;
}

function AlbumList(props) {
    const albums = props.albums;
    const items = albums.map((album) =>
        <Album album={album}/>
    );
    return (
        <CardColumns Style="margin: 0px 200px;">{items}</CardColumns>
    );
  }

class SpotifyBrowser extends React.Component {
  state = {
    value: '',
    searchedTerm: '',
    searchResult: [],
    error: false,
    errorMessage: "",
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
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
        <Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Spotify Albums Browser</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline onSubmit={this.handleSubmit}>
              <FormControl type="text" placeholder="Enter album name" value={this.state.value} onChange={this.handleChange} className="mr-sm-2" />
              <Button type="submit" variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {
          this.state.searchedTerm ? 
          <Alert variant="success">
            {this.state.searchResult.length} Results for query '{this.state.searchedTerm}'
          </Alert> 
          : ''
        }
        {
          this.state.error ? 
          <Alert variant="error">
            Error '{this.state.errorMessage}':
          </Alert> 
          : ''
        }
        <AlbumList albums={this.state.searchResult}/>
      </Fragment>);
  }
}

export default SpotifyBrowser;