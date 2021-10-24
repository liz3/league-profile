import React from 'react';
import styled from 'styled-components';

import SRWIN from "../../assets/img/match/icon-sr-victory.png"
import SRDEFEAT from "../../assets/img/match/icon-sr-defeat.png"
import HAWIN from "../../assets/img/match/icon-ha-victory.png"
import HADEFEAT from "../../assets/img/match/icon-ha-defeat.png"
import maps from "../../assets/maps.json"
import {QueueNames, formatTime} from "../../common/utils"
const MapImages = {
    SR:[SRWIN,SRDEFEAT],
    HA: [HAWIN, HADEFEAT]
}

const BottomLine = styled.div`
margin-top: 20px;
border-bottom: 1px solid rgb(60,55,50);
`
const Wrapper = styled.div`
padding: 20px 35px;

& > div {
    display: flex;
   
}
`;
const MapImg = styled.img`
width: 70px;
height: auto;
@media (min-width: 1780px) {
    width: 92px;

}
`;
const TextSection = styled.div`
margin-left: 15px;
`;
const ResultCaption = styled.p`
margin: 0;
font-weight: 700;
font-size: 32px;
letter-spacing: 1px;
font-family: "LoL Display";
text-transform: uppercase;
color: rgb(234,224,205);
@media (min-width: 1780px) {
    font-size: 38px;

}
`;
const InfoPart = styled.div`
display: flex;
align-items: center;
& span {
    font-size: 15px;
    @media (min-width: 1780px) {
        font-size: 18px;

    }
    margin-right: 14px;
    color: rgb(149,156,132);
}
`

const Head = ({data}) => {
    console.log(data)
    const map = maps.find(m => m.mapId === data.info.mapId);
    return <Wrapper>
        <div>

        <MapImg src={MapImages[data.mapId === 11 ? "SR":"HA"][data.win ? 0 : 1]} />
        <TextSection>
            <ResultCaption>{data.win ? "VICTORY": "DEFEAT"}</ResultCaption>
            <InfoPart>
                <span>{map.mapName}</span>
                <span>&#183;</span>
                <span>{QueueNames[data.info.queueId]}</span>
                <span>&#183;</span>
                <span>{formatTime(data.info.gameDuration)}</span>
                <span>&#183;</span>
                <span>{new Date(data.info.gameCreation).toLocaleDateString()}</span>
                <span>&#183;</span>
                <span>GameID: {data.info.gameId}</span>
            </InfoPart>
        </TextSection>
        </div>
        <BottomLine />
    </Wrapper>
}
export default Head;