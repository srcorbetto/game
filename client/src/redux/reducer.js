import { TEST, USER_LOGGED_IN } from './actions';

const initialState = {
    test: 'data',
    userEmail: null,
    userUid: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
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
        default:
            return state
    }
}

export default reducer;