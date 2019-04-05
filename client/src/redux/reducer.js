import { INIT_CHARACTER, TEST, USER_LOGGED_IN, USER_LOGGED_OUT } from './actions';

const initialState = {
    test: 'data',
    userEmail: null,
    userName: null,
    userColor: null,
    userShape: null,
    userUid: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case INIT_CHARACTER:
            return {
                ...state,
                userEmail: action.payload.email,
                // userName: action.payload.name,
                userColor: action.payload.color,
                // userShape: action.payload.shape,
                userUid: action.payload.uid
            }
        case TEST:
            return {
                ...state,
                test: action.payload
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
                userUid: null
            }
        default:
            return state
    }
}

export default reducer;