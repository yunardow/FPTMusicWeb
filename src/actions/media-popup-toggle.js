export const mediaPopupToggle = (artist = {}, show = false) => {

    return {
        type: "MEDIA_POPUP",
        payload: { artist, show }
    }
};