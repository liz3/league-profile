import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  loadLeagueMatchData,
  loadLeagueMatchDataFull,
  loadMatch,
} from "../common/reducers/data/actions";
import Banner from "../components/overview/Banner";
import MatchRoot from "../components/match/MatchRoot";
import BackgroundShadow from "../components/BackgroundShadow";
const RootWrapper = styled.div`
  transition: opacity 0.4s ease;
  height: 100%;
  position: relative;
`;

const Match = ({ match }) => {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { region, matchId, summonerId } = match.params;
  const dispatch = useDispatch();
  const { loaded: userPresent } = useSelector((state) => state.data.profile);
  useEffect(() => {
    setReady(false);
    setFailed(false);
    setLoading(true);
    dispatch(loadMatch(region, matchId))
      .then((gameLoaded) => {
        dispatch(loadLeagueMatchData()).then((res) => {
          dispatch(loadLeagueMatchDataFull()).then((res) => {
            setReady(true)
            setLoading(false)
          }).catch(err => setLoading(false))
        }).catch(err => setLoading(false))
      })
      .catch((err) => {
          setLoading(false)
        if (err?.response?.status === 404) {
          setFailed(true);
        }
      });
  }, [dispatch, region, matchId, summonerId]);

  return (
    <RootWrapper>
      {userPresent ? (
        <>
          <BackgroundShadow />
          <Banner simple />
          <MatchRoot loading={loading} failed={failed} ready={ready} userPresent={userPresent} summonerId={summonerId} />
        </>
      ) : (
        <MatchRoot loading={loading} ready={ready} failed={failed} summonerId={summonerId} />
      )}
    </RootWrapper>
  );
};
export default Match;
