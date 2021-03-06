import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { getArtists } from '../actions/get-artists';
import { artistPopupToggle } from '../actions/artist-popup-toggle';
import { mediaPopupToggle } from '../actions/media-popup-toggle';
import moment from 'moment';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

class MusicList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getArtists();
  }

  edit(artist) {
    // console.log('Artist need to edit', artist);
    this.props.artistPopupToggle(artist, 'EDIT', true);
  }

  add() {
    // console.log('Artist need to edit', artist);
    this.props.artistPopupToggle({}, 'ADD', true);
  }

  delete(artist) {
    // console.log('Artist need to edit', artist);
    this.props.artistPopupToggle(artist, 'DELETE', true);
  }

  play(artist) {
    console.log('play', artist);
    this.props.mediaPopupToggle(artist, true);
  }

  formatDate(date) {
    if (moment(date).isValid()) {
      return moment(date).format('DD MMM yyyy');
    }
    return moment().format('DD MMM yyyy');
  }

  renderPlayButton(artist) {
    let musicUrl = '';
    try {
      musicUrl = new URL(artist.sampleUrl);
    } catch (_) {
      return (<div></div>);
    }

    if (!artist.sampleUrl.toLowerCase().includes('.mp3')) {
      return (<div></div>);
    }

    return (<PlayArrowIcon fontSize="large" onClick={() => this.play(artist)} />)

  }

  renderImage(imageUrl) {
    let albumImage = '';
    try {
      albumImage = new URL(imageUrl);
    } catch (_) {
      return (<div></div>);
    }

    return (
      <div className="album-image" style={{ backgroundImage: `url(${albumImage})` }}>
      </div>
    );
  }

  render() {
    // console.log('artist is ', this.props.artists);

    if (!this.props.artists || this.props.artists.isLoading) {
      return (<div>Loading...</div>)
    }

    return (
      <section className="music-list">
        <Button className="fpt-button add-new" variant="contained" onClick={() => this.add()}>Add New</Button>
        <TableContainer component={Paper} className="table-container">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Num</TableCell>
                <TableCell align="center">Album&nbsp;Name</TableCell>
                <TableCell align="center">Artist&nbsp;Name</TableCell>
                <TableCell>Date&nbsp;Release</TableCell>
                <TableCell>Sample&nbsp;Audio</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.artists.data.map((artist, index) => (
                <TableRow
                  key={artist.artistId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">{index + 1}</TableCell>
                  <TableCell>
                    <div className="album-name-cell">
                      {this.renderImage(artist.imageUrl)} <span>{artist.albumName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{artist.artistName}</TableCell>
                  <TableCell>{this.formatDate(artist.releaseDate)}</TableCell>
                  <TableCell align="center">{this.renderPlayButton(artist)}</TableCell>
                  <TableCell align="right">{`${artist.price}  ???`}</TableCell>
                  <TableCell align="center">
                    <Button className="fpt-button" variant="contained" onClick={() => this.edit(artist)}>Edit</Button>
                    <Button className="fpt-button" variant="contained" onClick={() => this.delete(artist)} color="error">Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    artists: state.artists
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getArtists: getArtists,
    artistPopupToggle: artistPopupToggle,
    mediaPopupToggle: mediaPopupToggle,
  },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicList);