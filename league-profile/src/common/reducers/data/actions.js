import * as ActionTypes from "./types";
import Api from "../../Api";
export const loadProfile = (region, name) => (dispatch, getState) => {
  const {
    updated,
    user: userSaved,
    region: regionSaved,
  } = getState().data.profile;
  if (
    updated &&
    updated + 1000 * 60 > Date.now() &&
    userSaved &&
    regionSaved &&
    name === userSaved.name &&
    regionSaved === region
  ) {
    console.log("from cache");
    return new Promise((resolve) => resolve(getState().data.profile));
  }
  return Api.getProfile(region, name).then((res) => {
    dispatch({
      type: ActionTypes.LOAD_PROFILE,
      data: res.data,
      region,
      updated: Date.now(),
    });
    return res.data;
  });
};
export const loadProfileBySummonerId = (region, summonerId) => (dispatch, getState) => {
  return Api.getProfileBySummonerId(region, summonerId).then((res) => {
    dispatch({
      type: ActionTypes.LOAD_PROFILE,
      data: res.data,
      region,
      updated: Date.now(),
    });
    return res.data;
  });
};
export const loadMatchlist = () => (dispatch, getState) => {
  const { user, region } = getState().data.profile;
  Api.getMatchlist(region, user.accountId).then((res) => {
    dispatch({
      type: ActionTypes.LOAD_MATCHLIST,
      data: { matches: res.data },
    });
  });
};
export const loadMatch = (region, gameId) => (dispatch, getState) => {
  const { loaded, gameId: savedGameId } = getState().data.match;
  if (loaded && savedGameId === gameId) return Promise.resolve();
  return Api.getMatch(region, gameId).then((res) => {
    dispatch({
      type: ActionTypes.LOAD_MATCH,
      data: res.data,
      gameId,
    });
    return res.data;
  });
};
export const loadLeagueData = () => (dispatch, getState) => {
  const { loaded } = getState().data.leagueData;
  if (loaded) return Promise.resolve();
  return Api.getLeagueVersions().then((versionsRes) => {
    const version = versionsRes.data[0];
    Api.getChampions(version).then((champRes) => {
      const champions = champRes.data.data;
      return dispatch({
        type: ActionTypes.LOAD_LEAGUE_DATA,
        data: { version, champions },
      });
    });
  });
};
export const loadLeagueMatchData = () => (dispatch, getState) => {
  const { loaded } = getState().data.leagueMatchData;
  if (loaded) return Promise.resolve();
  return dispatch(loadLeagueData()).then(() => {
    const { version } = getState().data.leagueData;
    return Promise.all([Api.getSummoner(version)]).then((ress) => {
      const data = { summoners: ress[0].data.data };
      dispatch({ type: ActionTypes.LOAD_LEAGUE_MATCH_DATA, data });
      return data;
    });
  });
};
export const loadLeagueMatchDataFull = () => (dispatch, getState) => {
  const { loadedFull: loaded } = getState().data.leagueMatchData;
  if (loaded) return Promise.resolve();
  return dispatch(loadLeagueData()).then(() => {
    const { version } = getState().data.leagueData;
    return Promise.all([Api.getItems(version), Api.getRunes(version)]).then((ress) => {
      const data = { items: ress[0].data.data, runes: ress[1].data };
      dispatch({ type: ActionTypes.LOAD_LEAGUE_MATCH_DATA_FULL, data });
      return data;
    });
  });
};
