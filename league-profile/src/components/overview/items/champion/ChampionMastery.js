import React from 'react';
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import ChampImg from './ChampImg';
import ChampionModal from './ChampionModal';

const Wrapper = styled.div`
  min-height: 310px;
  text-align: center;
  position: relative;
  & > div:nth-child(1) {
    display: none;
    opacity: 0;
    transition: opacity .3s ease;
  }
  &:hover > div:nth-child(1) {
    display: block;
    opacity: 1;
  }
`;
const Caption = styled.p`
  margin: 0;
  color: #c7b184;
  font-family: "LoL Display";
  font-weight: 700;
  font-size: 20px;
  white-space: nowrap;
`;
const CaptionSmall = styled.p`
  margin: 0;
  color: #fff;
 
  font-family: "LoL Display";
  font-weight: 700;
  font-size: 28px;
`;

const Champion = () => {
    const user = useSelector((state) => state.data.profile);

    const champs = user.champs || [];
    return <Wrapper>
          <ChampionModal champs={champs} />
          <Caption>MASTERY SCORE</Caption>
          <CaptionSmall>{user.masteryAmount}</CaptionSmall>
         <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
         <ChampImg champId={champs[0].championId} level={champs[0].championLevel} />
         </div>
    </Wrapper>
}
export default Champion;