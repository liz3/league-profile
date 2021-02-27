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
  margin: 2px 30px 2px 0;
  background: url(${(props) => props.champImage});
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
        const champData = getEntryFromId(champions, e.championId);
        return (
          <Entry key={index} champImage={getChampionAvatar(patch, champData.id)}>
            <img src={IconBan} />
          </Entry>
        );
      })}
    </Wrapper>
  );
};
export default Bans;
