import { CUSTOMIZE_CHARACTER, INIT_CHARACTER, MOVE_CHAR_FORWARD, USER_LOGGED_IN, USER_LOGGED_OUT, SET_GAME_ROOM } from './actions';

const initialState = {
    userEmail: null,
    userName: null,
    userColor: null,
    userShape: null,
    userUid: null,
    activeRoom: null,
    objZ: 2.5,
    charZ: -3.225,
    objX: 0,
    charX: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CUSTOMIZE_CHARACTER:
            if (action.payload.attribute === 'color') {
                return {
                    ...state,
                    userColor: action.payload.propertyValue
                }
            } else {
                return {
                    ...state,
                    userShape: action.payload.propertyValue
                }    
            }
        case INIT_CHARACTER:
            return {
                ...state,
                userEmail: action.payload.email,
                // userName: action.payload.name,
                userColor: action.payload.color,
                userShape: action.payload.shape,
                userUid: action.payload.uid
            }
        case SET_GAME_ROOM:
            return {
                ...state,
                activeRoom: action.payload
            }
        case USER_LOGGED_IN:
            return {
                ...state,
                userEmail: action.payload.email,
                userUid: action.payload.uid
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                userEmail: null,
                userName: null,
                userColor: null,
                userShape: null,
                userUid: null
            }
        case MOVE_CHAR_FORWARD:
            return {
                ...state,
                charZ: action.payload.charZ,
                objZ: action.payload.objZ,
                charX: action.payload.charX,
                objX: action.payload.objX
            }
        default:
            return state
    }
}

export default reducer;