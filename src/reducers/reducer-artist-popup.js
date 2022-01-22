export default function (state=null, action) {
    switch(action.type){
        case 'ARTIST_POPUP' :
            return action.payload;
            break;
        
    }

    return state;

}
