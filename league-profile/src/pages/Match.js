import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux'
import { loadLeagueMatchData, loadLeagueMatchDataFull, loadMatch } from '../common/reducers/data/actions';
import Banner from '../components/overview/Banner';
import MatchRoot from '../components/match/MatchRoot';
import BackgroundShadow from '../components/BackgroundShadow';
const RootWrapper = styled.div`
transition: opacity .4s ease;
height: 100%;
position: relative;
`

const Match = ({match}) => {
    const [ready, setReady] = useState(false)
    const {region, matchId, summonerId} = match.params;
    const dispatch = useDispatch();
    const {loaded: userPresent} = useSelector(state => state.data.profile)
    useEffect(() => {
        setReady(false)
        dispatch(loadMatch(region, matchId)).then(gameLoaded => {
            dispatch(loadLeagueMatchData()).then(res => {
                dispatch(loadLeagueMatchDataFull()).then(res => setReady(true))
            })
        })
   
    }, [dispatch, region, matchId, summonerId]);

    if(!ready) return null;
    return <RootWrapper>
             {userPresent ?  <>
                <BackgroundShadow />
      <Banner simple />
      <MatchRoot userPresent={userPresent} summonerId={summonerId} />
        </> :   <MatchRoot summonerId={summonerId} />}
    </RootWrapper>;
}
export default Match;
