import { combineReducers } from "redux";

import data from "./data/reducer"
import context_menu from "./context_menu/reducer"

export default combineReducers({data, context_menu});