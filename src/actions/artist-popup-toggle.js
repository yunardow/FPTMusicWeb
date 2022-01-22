export const artistPopupToggle = (artist = {}, type = 'NEW', show = false) => {

    return {
        type: "ARTIST_POPUP",
        payload: { artist, type, show }
    }
};