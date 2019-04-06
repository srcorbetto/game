export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const userLoggedIn = payload => dispatch => {
    return dispatch({
        type: USER_LOGGED_IN,
        payload: payload
    })
}

// Doesn't need a payload
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const userLoggedOut = dispatch => {
    return dispatch({
        type: USER_LOGGED_OUT
    })
}

export const INIT_CHARACTER = 'INIT_CHARACTER';
export const initCharacter = payload => dispatch => {
    return dispatch({
        type: INIT_CHARACTER,
        payload: payload
    })
}

export const CUSTOMIZE_CHARACTER = 'CUSTOMIZE_CHARACTER';
export const customCharacter = payload => dispatch => {
    return dispatch({
        type: CUSTOMIZE_CHARACTER,
        payload: payload
    })
}