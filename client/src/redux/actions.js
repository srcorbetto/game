export const TEST = 'TEST';
export const testMethod = payload => dispatch => {
    return dispatch({
        type: TEST,
        payload: payload
    })
}