import { CUSTOMIZE_CHARACTER, INIT_CHARACTER, USER_LOGGED_IN, USER_LOGGED_OUT } from './actions';

const initialState = {
    userEmail: null,
    userName: null,
    userColor: null,
    userShape: null,
    userUid: null
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
        default:
            return state
    }
}

export default reducer;