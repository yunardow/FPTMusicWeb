export default function (state=null, action) {
    switch(action.type){
        case 'MEDIA_POPUP' :
            return action.payload;
            break;
        
    }

    return state;

}
