import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getChampionAvatar, getEntryFromId } from "../../../../common/utils";

const Wrapper = styled.div`
  position: relative;
  width: ${(props) => props.size || "120px"};
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
  left: ${(props) => (props.offsetRender ? 8 : 8)}%;
  width: ${(props) => (props.offsetRender ? 81 : 81)}%;
  height: auto;
  top: ${(props) => (props.offsetRender ? 48 : 48)}%;
`;
const Emblem = styled.img`
  position: absolute;
  left: ${(props) => (props.offsetRender ? 12 : 1.5)}%;
  width: ${(props) => (props.offsetRender ? 75 : 95)}%;
  height: auto;
  top: ${(props) => (props.offsetRender ? 78 : 75)}%;
`;

const ChampImg = ({ champId, level, size, offset }) => {
  const { loaded, champions } = useSelector((state) => state.data.leagueData);
  const patch = useSelector((state) => state.data.leagueData.version);
  if (!loaded) return null;
  const entry = getEntryFromId(champions, champId);
  const url = getChampionAvatar(patch, entry.id);

  return (
    <Wrapper size={size}>
      <EmblemBackground
        src={
          require(`../../../../assets/img/champion_mastery/mastery_level${level}banner.png`)
            .default
        }
        offsetRender={offset}
      />
      <ChampionImage src={url} />
      <BorderImage
        src={
          require("../../../../assets/img/champion_mastery/mastery_framecomplete.png")
            .default
        }
      />
      {level > 1 ? (
        <Emblem
          src={
            require(`../../../../assets/img/champion_mastery/mastery_level${level}.png`)
              .default
          }
          offsetRender={offset}
        />
      ) : null}
    </Wrapper>
  );
};

export default ChampImg;
