export const TEST = 'TEST';
export const testMethod = payload => dispatch => {
    return dispatch({
        type: TEST,
        payload: payload
    })
}

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const userLoggedIn = payload => dispatch => {
    return dispatch({
        type: USER_LOGGED_IN,
        payload: payload
    })
}

// Doesn't need a payload
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const userLoggedOut = payload => dispatch => {
    return dispatch({
        type: USER_LOGGED_OUT,
        payload: payload
    })
}

export const INIT_CHARACTER = 'INIT_CHARACTER';
export const initCharacter = payload => dispatch => {
    return dispatch({
        type: INIT_CHARACTER,
        payload: payload
    })
}