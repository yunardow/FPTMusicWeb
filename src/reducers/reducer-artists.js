export default function artists(state = null, action) {
  switch (action.type) {
    case 'ARTISTS_LOADING':
      return {
        data: action.payload,
        isLoading: true,
      };
    case 'ARTISTS_DONE':
      return {
        data: action.payload,
        isLoading: false,
      };
    case 'ARTISTS_ERROR':
      return {
        data: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
