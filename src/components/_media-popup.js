import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { mediaPopupToggle } from '../actions/media-popup-toggle';
import ReactAudioPlayer from 'react-audio-player';

class MediaPopup extends Component {

  closePopup() {
    this.props.mediaPopupToggle({}, false);
  }

  render() {
    // console.log('this-props-artistPopup', this.props.artistPopup);
    // console.log('checkDate', this.state.releaseDate);

    if (!this.props.mediaPopup) {
      return <div></div>;
    }

    const { artist: {
      albumName = '',
      artistName = '',
      imageUrl = '',
      sampleUrl = ''
    }, show = true } = this.props.mediaPopup;

    if (!show) {
      return <div></div>;
    }

    return (
      <div>
        <Modal
          open={show}
          onClose={() => this.closePopup()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="media-modal"
        >
          <Paper className="media-modal-content">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Artist Name : {artistName}
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Album Name : {albumName}
            </Typography>
            <div className="album-image" style={{ backgroundImage: `url(${imageUrl})` }}>
            </div>

            <div className="media-player">
              <ReactAudioPlayer
                src={sampleUrl}
                autoPlay={false}
                controls
              />
            </div>
          </Paper>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mediaPopup: state.mediaPopup
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    mediaPopupToggle: mediaPopupToggle,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaPopup);