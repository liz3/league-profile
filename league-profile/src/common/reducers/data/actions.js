import * as ActionTypes from "./types";
import Api from "../../Api";
export const loadProfile = (region, name,tag) => (dispatch, getState) => {
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
    return new Promise((resolve) => resolve(getState().data.profile));
  }

  return Api.getProfile(region, name, tag).then((res) => {
    if(Array.isArray(res.data.ranked) && res.data.ranked.length)
      res.data.ranked = res.data.ranked.filter(entry => entry.queueType !== "RANKED_TFT_TURBO");
    dispatch({
      type: ActionTypes.LOAD_PROFILE,
      data: res.data,
      region,
      updated: Date.now(),
    });
    return res.data;
  });
};
export const loadProfileBySummonerId = (region, summonerId) => (
  dispatch,
  getState
) => {
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
  Api.getMatchlist(region, user.id).then((res) => {
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
  return Api.getLeagueVersions()
    .then((versionsRes) => {
      const version = versionsRes.data[0];
      return Api.getChampions(version)
        .then((champRes) => {
          const champions = champRes.data.data;
          return dispatch({
            type: ActionTypes.LOAD_LEAGUE_DATA,
            data: { version, champions },
          });
        })
        .catch(() =>
          alert(
            "Something went wrong while fetching the champions list which is a rito thingy....sry"
          )
        );
    })
    .catch(() =>
      alert(
        "Something went wrong while fetching the patch list which is a rito thingy....sry"
      )
    );
};
export const loadLeagueMatchData = () => (dispatch, getState) => {
  const { loaded } = getState().data.leagueMatchData;
  if (loaded) return Promise.resolve();
  return dispatch(loadLeagueData()).then(() => {
    const { version } = getState().data.leagueData;
    return Promise.all([Api.getSummoner(version)])
      .then((ress) => {
        const data = { summoners: ress[0].data.data };
        dispatch({ type: ActionTypes.LOAD_LEAGUE_MATCH_DATA, data });
        return data;
      })
      .catch(() =>
        alert(
          "Something went wrong while fetching the summoner spells which is a rito thingy....sry"
        )
      );
  });
};
export const loadLeagueMatchDataFull = () => (dispatch, getState) => {
  const { loadedFull: loaded } = getState().data.leagueMatchData;
  if (loaded) return Promise.resolve();
  return dispatch(loadLeagueData()).then(() => {
    const { version } = getState().data.leagueData;
    return Promise.all([Api.getItems(version), Api.getRunes(version)])
      .then((ress) => {
        const data = { items: ress[0].data.data, runes: ress[1].data };
        dispatch({ type: ActionTypes.LOAD_LEAGUE_MATCH_DATA_FULL, data });
        return data;
      })
      .catch(() =>
        alert(
          "Something went wrong while fetching items or runes which is a rito thingy....sry"
        )
      );
  });
};
export const setPage = page => dispatch => {
  dispatch({type: ActionTypes.SET_ACTIVE_PAGE, page})
}
