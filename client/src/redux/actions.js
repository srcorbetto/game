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

export const SAVE_CHARACTER_BUILD = 'SAVE_CHARACTER_BUILD';
export const saveCharacterBuild = payload => dispatch => {
    return dispatch({
        type: SAVE_CHARACTER_BUILD,
        payload: payload
    })
}

export const SET_GAME_ROOM = 'SET_GAME_ROOM';
export const setGameRoom = payload => dispatch => {
    return dispatch({
        type: SET_GAME_ROOM,
        payload: payload
    })
}

export const MOVE_CHAR_FORWARD = 'MOVE_CHAR_FORWARD';
export const moveCharForward = payload => dispatch => {
    return dispatch({
        type: MOVE_CHAR_FORWARD,
        payload: payload
    })
}