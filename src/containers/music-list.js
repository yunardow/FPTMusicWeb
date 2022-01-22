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

class MusicList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getArtists();
  }

  edit(artist) {
    console.log('Artict need to edit', artist);
  }

  render() {
    // console.log('artist is ', this.props.artistsReducers);

    if (!this.props.artistsReducers || this.props.artistsReducers.isLoading) {
      return (<div>Loading...</div>)
    }

    return (
      <section className="music-list">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Num</TableCell>
                <TableCell align="right">Album&nbsp;Name</TableCell>
                <TableCell align="right">Artist&nbsp;Name</TableCell>
                <TableCell align="right">Date&nbsp;Release</TableCell>
                <TableCell align="right">Sample&nbsp;Audio</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.artistsReducers.data.map((artist, index) => (
                <TableRow
                  key={artist.artistId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{index}</TableCell>
                  <TableCell align="right">{artist.albumName}</TableCell>
                  <TableCell align="right">{artist.artistName}</TableCell>
                  <TableCell align="right">{artist.releaseDate}</TableCell>
                  <TableCell align="right">{artist.sampleUrl}</TableCell>
                  <TableCell align="right">{artist.price}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" onClick={() => this.edit("edit", artist)}>Edit</Button>
                    <Button variant="contained" color="error">Delete</Button></TableCell>
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
    artistsReducers: state.artistsReducers
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getArtists: getArtists,
  },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicList);