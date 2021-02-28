import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getChampionAvatar, getEntryFromId } from "../../common/utils";
import IconBan from "../../assets/img/match/icon-ban.png";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Entry = styled.div`
  width: 50px;
  height: 50px;
  @media (min-width: 1780px) {
    width: 64px;
    height: 64px;
  }
  margin: 2px 30px 2px 0;
  background: ${props => props.champImage ? `url(${props.champImage})` : 'rgb(0,0, 0)'};
  background-size: cover;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const Bans = ({ bans }) => {
  const patch = useSelector((state) => state.data.leagueData.version);

  const { champions } = useSelector((state) => state.data.leagueData);

  return (
    <Wrapper>
      {bans.map((e, index) => {

        if(e.championId === -1)
        return (
          <Entry key={index} champImage={null} />
        );
        const champData = getEntryFromId(champions, e.championId);
       
        return (
          <Entry key={index} champImage={getChampionAvatar(patch, champData.id)}>
            <img alt={"champ ban"} src={IconBan} />
          </Entry>
        );
      })}
    </Wrapper>
  );
};
export default Bans;
