import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux'
import { loadLeagueMatchData } from '../../common/reducers/data/actions';
import Match from './Match';
import RecentlyPlayed from './RecentlyPlayed';

const Wrapper = styled.div`
display: flex;
position: relative;
width: 100%;
height: calc(100% - 50px);
`
const ListWrapper = styled.div`
min-width: 950px;
height: 100%;
display: flex;
flex-direction: column;
@media (min-width: 1700px) {
    min-width: 1100px;
}
`;
const ListCaption = styled.p`
padding: 0 30px;
text-transform: uppercase;
color: rgb(240,230,210);
font-family: "LoL Display";
font-weight: 700;
font-size: 23px;
margin:35px 0 15px 0;

@media (min-width: 1700px) {
    font-size: 26px;
}
`

const TabCaption = styled.div`
margin: 0 30px;

& > span {
    text-transform: uppercase;
color: rgb(240,230,210);
font-family: "LoL Display";
font-weight: 700;
font-size: 18px;
@media (min-width: 1700px) {
    font-size: 22px;
}
}
border-bottom: 3px solid rgb(200, 155, 60);
width: 95px;
text-align: center;
`

const InfoWrapper = styled.div`
padding-left: 30px;

`
const MatchListContainer = styled.div`
position: relative;
overflow-y: scroll;
::-webkit-scrollbar {
    width:6px;
    
  }
::-webkit-scrollbar-track {
  background: transparent;
  }
::-webkit-scrollbar-thumb {
  background-color: rgb(120, 90, 40);
  border-radius: 10px;
  }
  
flex-grow: 1;
width: 100%;
margin-top: 15px;
max-width: 900px;
@media (min-width: 1700px) {
    max-width: 1200px;
}
`

const MatchlistRoot = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadLeagueMatchData());
    }, [dispatch])
    const {matches, loaded} = useSelector(state => state.data.matchlist);
return <Wrapper>
    <ListWrapper>
        <ListCaption>Recent Games (Last 20 Played)</ListCaption>
        <TabCaption><span>General</span></TabCaption>
        {loaded ? <MatchListContainer>
            {matches.map(match => <Match data={match} key={match.gameId} />)}
        </MatchListContainer> : null}
    </ListWrapper>
    <InfoWrapper>
            <RecentlyPlayed matches={matches} />
    </InfoWrapper>
</Wrapper>
}
export default MatchlistRoot;