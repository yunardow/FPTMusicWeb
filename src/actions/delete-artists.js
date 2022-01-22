import axios from 'axios';
import { sendFilterState } from './base';

export function deleteArtist(artistId) {

  return (dispatch) => {
    dispatch(sendFilterState('ARTISTS_LOADING', []));
    console.log('delete artist Id', artistId);

    return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/artist/${artistId}`)
      .then(function (response) {
        // console.log('response success', response);
        dispatch(sendFilterState('ARTISTS_DONE', response.data));
      })
      .catch(function (error) {
        console.log('response error', error);
        dispatch(sendFilterState('ARTISTS_ERROR', []));
      });

  }
}
