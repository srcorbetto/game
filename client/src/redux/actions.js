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