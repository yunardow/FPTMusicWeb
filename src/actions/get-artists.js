import axios from 'axios';
import { sendFilterState } from './base';

export function getArtists() {

  return (dispatch) => {
    dispatch(sendFilterState('ARTISTS_LOADING', []));

    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/artist`)
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
