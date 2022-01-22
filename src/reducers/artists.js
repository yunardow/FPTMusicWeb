export default function artists(state = null, action) {
  switch (action.type) {
    case 'GET_ARTISTS_LOADING':
      return {
        data: action.payload,
        isLoading: true,
      };
    case 'GET_ARTISTS_DONE':
      return {
        data: action.payload,
        isLoading: false,
      };
    case 'GET_ARTISTS_ERROR':
      return {
        data: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
