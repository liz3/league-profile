import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  getChampionAvatar,
  getEntryFromId,
  getItemImage,
  getSummonerImage,
  QueueNames,
  formatTime,
} from "../../common/utils";
import maps from "../../assets/maps.json";
import { withRouter } from "react-router-dom";

const ChampImg = styled.div`
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    rgba(120, 90, 40, 1) 0%,
    rgba(53, 42, 17, 1) 100%
  );
  padding: 2px;

  & img {
    @media (min-width: 1700px) {
      width: 105px;
    }
    border-radius: 50%;
    height: auto;
    width: 85px;
    
    display: block;
  }
`;

const ImageWrapper = styled.div`
  position: relative;

  & > div:nth-child(2) {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgb(192,149,58);
    left: 68%;
    top: 64%;
    width: 24px;
    height: 24px;
    @media (min-width: 1700px) {
      width: 28px;
      height: 28px;
    }
    background: rgb(1, 10, 19);
    & span {
        display: block;
      color: rgb(147, 143, 130);
      font-family: "LoL Display";
      text-align: center;
      width 100%;
      height: 100%;
      line-height: 22px;
      @media (min-width: 1700px) {
        font-size: 17px;
        line-height: 25px;
      }
    }
  }
`;
const LeftBar = styled.div`
  position: absolute;
  left: 0px;
  height: 100%;
  width: 9px;
  top: 0;
  background: transparent;
`;
const TopBar = styled.div`
  position: absolute;
  left: 0px;
  height: 1px;
  width: 100%;
  top: 0;
  background: transparent;
`;
const BottomBar = styled.div`
  position: absolute;
  left: 0px;
  height: 1px;
  width: 100%;
  bottom: 0;
  background: transparent;
`;
const RootWrapper = styled.div`
position: relative;
  display: flex;
  margin: 0;
  padding: 15px 0 15px 35px;
  :hover {
    cursor: pointer;
    ${ChampImg} {
      background: linear-gradient(90deg, rgba(91,77,44,1) 0%, rgba(240,218,148,1) 100%);
    }
    ${LeftBar} {
      background: linear-gradient(5deg, rgba(108,81,36,1) 0%, rgba(77,60,23,1) 100%);

    }
    ${TopBar} {
      background: linear-gradient(90deg, rgba(79,62,31,1) 0%, rgba(204,185,142,1) 30%, rgba(0,0,0,0.2) 100%);


    }
    ${BottomBar} {
      background: linear-gradient(90deg, rgba(79,62,31,1) 0%, rgba(204,185,142,1) 30%, rgba(0,0,0,0.2) 100%);


    }
  }
}

`;

const MetaPart = styled.div`
  margin-left: 25px;
  width: 200px;
  @media (min-width: 1700px) {
    width: 250px;

  }
`;
const GameResultTitle = styled.p`
  text-transform: uppercase;
  color: ${(props) => (props.win ? "rgb(125,203,230)" : "rgb(255,35,69)")};
  font-family: "LoL Display";
  font-size: 20px;
  margin: 0 0 2px 0;
  font-weight: 700;
  letter-spacing: 1px;
  @media (min-width: 1700px) {
    font-size: 23px;

  }
`;
const GameModeSpan = styled.span`
  color: rgb(140, 137, 125);
  font-size: 16px;
  margin: 0 0 4px 0;
  @media (min-width: 1700px) {
    font-size: 19px;

  }
`;
const SpellsWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  & img {
    width: 30px;
    height: auto;
  }
`;
const BuildPart = styled.div``;
const ItemContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;
const Item = styled.div`
width: 42px;
height: 42px;
border: 1px solid rgb(95,73,30);
background rgb(1,10,19);
@media (min-width: 1700px) {
  width: 47px;
height: 47px;
}
& img {
    height: 100%;
    width: auto;
    }
`;
const StatsPart = styled.div`
  display: flex;
  & span {
    margin: 10px 0 0 0;
    color: rgb(140, 137, 125);
    font-family: "LoL Display";
    font-weight: 700;
    @media (min-width: 1700px) {
      font-size: 26px;
  }
    font-size: 22px;
  }
`;
const InfoPart = styled.div`
  margin-left: 40px;
  & span {
    display: block;

    padding: 8px 0;
    color: rgb(140, 137, 125);
    font-size: 15px;
    @media (min-width: 1700px) {
      font-size: 18px;
  }
  }
  & div {
    display: flex;
    & > span:nth-child(1) {
      margin-right: 20px;
    }
  }
`;

const Match = ({ data, history }) => {
  const patch = useSelector((state) => state.data.leagueData.version);
  const user = useSelector((state) => state.data.profile);
  const { champions } = useSelector((state) => state.data.leagueData);
  const { summoners } = useSelector((state) => state.data.leagueMatchData);
  const entry = getEntryFromId(champions, data.playerData.championId);

  return (
    <RootWrapper
      onClick={() =>
        history.push(`/match/${user.region}/${data.gameId}/${user.user.id}`)
      }
    >
      <LeftBar />
      <TopBar />
      <BottomBar />
      <ImageWrapper>
        <ChampImg>
          <img alt={""} src={getChampionAvatar(patch, entry.id)} />
        </ChampImg>
        <div>
          <span>{data.playerData.stats.champLevel}</span>
        </div>
      </ImageWrapper>
      <MetaPart>
        <GameResultTitle win={data.win}>
          {data.win ? "victory" : "defeat"}
        </GameResultTitle>
        <GameModeSpan>{QueueNames[data.queueId]}</GameModeSpan>
        <SpellsWrapper>
          <img
            alt={""}
            src={getSummonerImage(
              patch,
              getEntryFromId(summoners, data.playerData.spell1Id).id
            )}
          />
          <img
            alt={""}
            src={getSummonerImage(
              patch,
              getEntryFromId(summoners, data.playerData.spell2Id).id
            )}
          />
        </SpellsWrapper>
      </MetaPart>
      <BuildPart>
        <ItemContainer>
          {Array(7)
            .fill()
            .map((_, index) => (
              <Item key={index}>
                {data.playerData.stats[`item${index}`] ? (
                  <img
                    alt={""}
                    src={getItemImage(
                      patch,
                      data.playerData.stats[`item${index}`]
                    )}
                  />
                ) : null}
              </Item>
            ))}
        </ItemContainer>
        <StatsPart>
          <span style={{ width: "45%" }}>
            {data.playerData.stats.kills} / {data.playerData.stats.deaths} /{" "}
            {data.playerData.stats.assists}
          </span>
          <span style={{ width: "25%" }}>
            {data.playerData.stats.neutralMinionsKilled +
              data.playerData.stats.totalMinionsKilled}
          </span>
          <span style={{ width: "30%", textAlign: "right" }}>
            {data.playerData.stats.goldEarned.toLocaleString(undefined, {
              style: "decimal",
            })}
          </span>
        </StatsPart>
      </BuildPart>
      <InfoPart>
        <span>{maps.find((map) => map.mapId === data.mapId).mapName}</span>

        <div>
          <span>{formatTime(`${data.gameDuration}`)}</span>
          <span>{new Date(data.gameCreation).toLocaleDateString()}</span>
        </div>
      </InfoPart>
    </RootWrapper>
  );
};
export default withRouter(Match);
