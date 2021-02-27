import * as ActionTypes from "./types"
const context_menu = (state = null, action) => {
    switch(action.type) {
        case ActionTypes.SET_DATA:
            return action.data;
        default:
            return state;
    }
}
export default context_menu;