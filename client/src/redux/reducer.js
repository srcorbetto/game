import { TEST } from './actions';

const initialState = {
    test: 'data'
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case TEST:
            return {
                ...state,
                test: action.payload
            }
        default:
            return state
    }
}

export default reducer;