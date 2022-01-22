import axios from 'axios';
import { sendFilterState } from './base';

export function getArtists() {

  return (dispatch) => {
    dispatch(sendFilterState('GET_ARTISTS_LOADING', []));

    return axios.get(`http://10.211.55.3:8082/artist`)
      .then(function (response) {
        // console.log('response success', response);
        dispatch(sendFilterState('GET_ARTISTS_DONE', response.data));
      })
      .catch(function (error) {
        console.log('response error', error);
        dispatch(sendFilterState('GET_ARTISTS_ERROR', []));
      });

  }
}
