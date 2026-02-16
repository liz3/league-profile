import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getChampionAvatar, getEntryFromId } from "../../../../common/utils";
import NoChampImg from "../../../../assets/img/champion_mastery/mastery_framelevel0.png";

const Wrapper = styled.div`
  position: relative;
  width: ${(props) => props.size || "120"}px;
  @media (min-width: 1780px) {
    width: ${(props) => props.size * 1.3 || "140"}px;
  }
  height: auto;
`;
const ChampionImage = styled.img`
  position: relative;
  border-radius: 50%;
  width: 80%;
  height: auto;
  left: 0;
  margin-top: 10%;
  overflow: hidden;
`;
const BorderImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
`;
const EmblemBackground = styled.img`
  position: absolute;
  left: ${(props) => (props.offsetRender ? 4 : 4)}%;
  width: ${(props) => (props.offsetRender ? 90 : 90)}%;
  height: auto;
  top: ${(props) => (props.offsetRender ? 74 : 74)}%;
`;
const EmblemBackgroundEmpty = styled.img`
  position: absolute;
  height: auto;
  top: ${(props) => (props.offsetRender ? 44 : 44)}%;
  left: 18%;
  width: 63%;
  background rgb(1,10,19);

`;
const Emblem = styled.img`
position: absolute;
  left: 8.5%;
  width: 84%;
  height: auto;
  top: 57%;
`;

const getBannerBackground = level => {
  if(level <5)
    return `mastery-banner-1.svg`;
  if(level < 10)
    return `mastery-banner-2.svg`
   return `mastery-banner-3.svg`
}

const ChampImg = ({ champId, level, size, offset }) => {
  const { loaded, champions } = useSelector((state) => state.data.leagueData);
  const patch = useSelector((state) => state.data.leagueData.version);
  if (!loaded) return null;
  const entry = champId ? getEntryFromId(champions, champId) : null;
  const url = champId ? getChampionAvatar(patch, entry.id) : null;

  return (
    <Wrapper size={size}>
      {champId ? (
        <EmblemBackground
          src={require(
            `../../../../assets/img/champion_mastery/${getBannerBackground(level)}`,
          )}
          offsetRender={offset}
        />
      ) : (
        <EmblemBackgroundEmpty
          src={require(
            `../../../../assets/img/champion_mastery/mastery_level${level > 7 ? 7 : level}banner.png`,
          )}
          offsetRender={offset}
        />
      )}
      <ChampionImage src={url || NoChampImg} />
      {champId ? (
        <BorderImage
          src={require("../../../../assets/img/champion_mastery/mastery_framecomplete.png")}
        />
      ) : null}
      {level > 1 ? (
        <Emblem
          src={require(
            `../../../../assets/img/champion_mastery/mastery_level${level > 10 ? 10 : level}.png`,
          )}
          offsetRender={offset}
        />
      ) : null}
    </Wrapper>
  );
};

export default ChampImg;
