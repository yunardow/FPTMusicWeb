import axios from 'axios';
import { sendFilterState } from './base';

export function addArtist(artist) {

  return (dispatch) => {
    dispatch(sendFilterState('ARTISTS_LOADING', []));

    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/artist`, artist)
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
