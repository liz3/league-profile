import * as ActionTypes from "./types";
import { combineReducers } from "redux";

const profile = (state = { loaded: false }, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_PROFILE:
      return {
        ...action.data,
        loaded: true,
        region: action.region,
        updated: action.updated,
      };
    default:
      return state;
  }
};
const matchlist = (state = { loaded: false }, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_MATCHLIST:
      return { ...action.data, loaded: true };
    default:
      return state;
  }
};
const match = (state = { loaded: false }, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_MATCH:
      return { ...action.data, gameId: action.gameId, loaded: true };
    default:
      return state;
  }
};
const leagueData = (state = { loaded: false }, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_LEAGUE_DATA:
      return { ...action.data, loaded: true };
    default:
      return state;
  }
};
const activePage = (state = "home", action) => {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_PAGE:
      return action.page;
    default:
      return state;
  }
};
const leagueMatchData = (
  state = { loaded: false, loadedFull: false },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOAD_LEAGUE_MATCH_DATA:
      return { ...state, ...action.data, loaded: true };
    case ActionTypes.LOAD_LEAGUE_MATCH_DATA_FULL:
      return { ...state, ...action.data, loadedFull: true };
    default:
      return state;
  }
};

export default combineReducers({
  profile,
  leagueData,
  matchlist,
  leagueMatchData,
  match,
  activePage
});
