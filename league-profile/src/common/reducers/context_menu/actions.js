import * as ActionTypes from "./types"
export const setData = data => dispatch => {
    dispatch({type: ActionTypes.SET_DATA, data})
}