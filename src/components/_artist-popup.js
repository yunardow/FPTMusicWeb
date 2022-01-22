import React, { Component } from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { artistPopupToggle } from '../actions/artist-popup-toggle';
import { updateArtists } from '../actions/update-artists';
import { deleteArtist } from '../actions/delete-artists';

class ArtistPopup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artistId: undefined,
      artistName: undefined,
      albumName: undefined,
      imageUrl: undefined,
      price: undefined,
      sampleUrl: undefined,
      releaseDate: undefined,
    };
  }

  closePopup() {
    this.props.artistPopupToggle({}, '', false);
  }

  delete() {
    const { artist: { artistId = '' }, type } = this.props.artistPopup;

    if (artistId !== '' && type === 'DELETE') {
      this.props.deleteArtist(artistId);
    }

    this.closePopup();
  }

  save() {
    const { artist: {
      artistId = '',
      albumName = '',
      artistName = '',
      releaseDate = moment().inspect(),
      price = '',
      imageUrl = '',
      sampleUrl = ''
    }, show = true, type } = this.props.artistPopup;

    const artist = {
      artistId: this.state.artistId ?? artistId,
      artistName: this.state.artistName ?? artistName,
      albumName: this.state.albumName ?? albumName,
      imageUrl: this.state.imageUrl ?? imageUrl,
      price: this.state.price ?? price,
      sampleUrl: this.state.sampleUrl ?? sampleUrl,
      releaseDate: this.state.releaseDate ?? releaseDate,
    }

    console.log('save click', artist, type);
    if (type === 'EDIT') {
      this.props.updateArtists(artist);
    }

    this.closePopup();
  }

  onArtistNameChange(evt) {
    // Some validation should be here if have time
    this.setState({
      artistName: evt.target.value
    });
  }

  onAlbumNameChange(evt) {
    // Some validation should be here if have time
    this.setState({
      albumName: evt.target.value
    });
  }

  onPriceChange(evt) {
    // Some validation should be here if have time
    this.setState({
      price: evt.target.value
    });
  }

  onReleaseDateChange(evt) {
    // Some validation should be here if have time
    this.setState({
      releaseDate: evt.target.value
    });
  }

  onImageUrlChange(evt) {
    // Some validation should be here if have time
    this.setState({
      imageUrl: evt.target.value
    });
  }

  onSampleUrlChange(evt) {
    // Some validation should be here if have time
    this.setState({
      sampleUrl: evt.target.value
    });
  }

  render() {
    // console.log('this-props-artistPopup', this.props.artistPopup);
    // console.log('checkDate', this.state.releaseDate);

    if (!this.props.artistPopup) {
      return <div></div>;
    }

    const { artist: {
      albumName = '',
      artistName = '',
      releaseDate = moment().inspect(),
      price = '',
      imageUrl = '',
      sampleUrl = ''
    }, show = true, type } = this.props.artistPopup;

    if (!show) {
      return <div></div>;
    }

    console.log('onArtistNameChange', this.state.artistName);

    return (
      <div>
        <Modal
          open={show}
          onClose={() => this.closePopup()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="artist-modal"
        >
          <Paper className="artist-modal-content">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {type}
            </Typography>
            <div className="popup-field-container">
              <div className="popup-field">
                <TextField
                  className="textfield"
                  disabled={type === 'DELETE'}
                  required
                  id="outlined-required"
                  label="Album Name"
                  defaultValue={albumName}
                  onChange={(env) => this.onAlbumNameChange(env)}
                />
              </div>
              <div className="popup-field">
                <TextField
                  className="textfield"
                  disabled={type === 'DELETE'}
                  required
                  id="outlined-required"
                  label="Artist name"
                  defaultValue={artistName}
                  onChange={(env) => this.onArtistNameChange(env)}
                />
              </div>
              <div className="popup-field">
                <TextField
                  className="textfield"
                  disabled={type === 'DELETE'}
                  required
                  id="outlined-required"
                  label="Release Date"
                  defaultValue={releaseDate}
                  onChange={(env) => this.onReleaseDateChange(env)}
                />
              </div>
              <div className="popup-field">
                <TextField
                  className="textfield"
                  disabled={type === 'DELETE'}
                  required
                  id="outlined-required"
                  label="Price"
                  defaultValue={price}
                  onChange={(env) => this.onPriceChange(env)}
                />
              </div>
              <div className="popup-field">
                <TextField
                  className="textfield"
                  disabled={type === 'DELETE'}
                  id="outlined-required"
                  label="Image Url"
                  defaultValue={imageUrl}
                  onChange={(env) => this.onImageUrlChange(env)}
                />
              </div>
              <div className="popup-field">
                <TextField
                  className="textfield"
                  disabled={type === 'DELETE'}
                  id="outlined-required"
                  label="Sample Url"
                  defaultValue={sampleUrl}
                  onChange={(env) => this.onSampleUrlChange(env)}
                />
              </div>
            </div>

            <div className="popup-action">
              {type !== 'DELETE' && (
                <Button className="fpt-button" variant="contained" onClick={() => this.save()}>Save</Button>
              )}
              {type === 'DELETE' && (
                <Button className="fpt-button" variant="contained" onClick={() => this.delete()} color="error">Delete</Button>
              )}
              <Button className="fpt-button" variant="outlined" onClick={() => this.closePopup()}>Cancel</Button>
            </div>
          </Paper>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    artistPopup: state.artistPopup
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    artistPopupToggle: artistPopupToggle,
    updateArtists: updateArtists,
    deleteArtist: deleteArtist,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPopup);