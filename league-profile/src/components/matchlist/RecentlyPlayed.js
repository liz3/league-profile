import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getChampionAvatar, getEntryFromId } from "../../common/utils";
import ActivityBar from "./ActivityBar";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 85px;
`;
const Title = styled.p`
  margin: 0 0 10px 0;
  font-family: "LoL Display";
  font-weight: 700;
  font-size: 18px;
  @media (min-width: 1780px) {
    font-size: 23px;
  }
  color: rgb(240, 230, 210);
  text-transform: uppercase;
`;
const List = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const Item = styled.div`
  width: 95px;
  @media (min-width: 1780px) {
    width: 120px;
    margin: 0 12px;
  }
  margin: 0 8px;
  height: auto;
  position: relative;
  & img {
    width: 100%;
    height: auto;
    position: relative;
  }
`;

const PercentSpan = styled.p`
  margin: 0;
  text-align: center;
  margin-top: 80px;
  font-family: "LoL Display";
  font-weight: 700;
  font-size: 23px;
  @media (min-width: 1780px) {
    font-size: 27px;
    margin-top: 100px;
  }
  background: linear-gradient(
    90deg,
    rgba(200, 172, 114, 1) 0%,
    rgba(138, 112, 61, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
`;
const CaptionSpan = styled.p`
  margin: 0;
  text-align: center;
  margin-top: 50px;
  font-size: 16px;
  @media (min-width: 1780px) {
    font-size: 19px;
  }
  color: rgb(160, 155, 140);
`;
const getBannerBackground = (level) => {
  if (level < 5) return `mastery-banner-1.svg`;
  if (level < 10) return `mastery-banner-2.svg`;
  return `mastery-banner-3.svg`;
};
const RecentlyPlayed = ({ matches = [] }) => {
  const patch = useSelector((state) => state.data.leagueData.version);
  const champs = {};
  const { champs: userChamps } = useSelector((state) => state.data.profile);
  const { champions } = useSelector((state) => state.data.leagueData);

  const counts = {
    Fighter: 0,
    Tank: 0,
    Mage: 0,
    Assassin: 0,
    Support: 0,
    Marksman: 0,
  };
  matches.forEach((element) => {
    const champId = element.playerData.championId;
    const entry = getEntryFromId(champions, champId);
    counts[entry.tags[0]]++;
    if (champs[champId]) {
      champs[champId].count += 1;
      champs[champId].percent = (champs[champId].count / 20) * 100;
    } else {
      champs[champId] = {
        id: champId,
        count: 1,
        percent: 5,
        level: (
          userChamps.find((e) => e.championId === champId) || {
            championLevel: 1,
          }
        ).championLevel,
      };
    }
  });
  const sorted = Object.values(champs)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  /*
position: absolute;
  left: -7%;
  top: 55px;
  width: 110%;
}
 */
  return (
    <Wrapper>
      <Title>Recently Played Champion</Title>
      <List>
        {sorted.map((c) => {
          const champData = getEntryFromId(champions, c.id);

          return (
            <Item key={c.id}>
              <img
                alt={""}
                style={{ position: "absolute", left: 0, top: "93px" }}
                src={require(
                  `../../assets/img/champion_mastery/${getBannerBackground(c.level)}`,
                )}
              />

              <img alt={""} src={getChampionAvatar(patch, champData.id)} />
              <img
                style={{position: "absolute", left: "-5%", top: "55px", width: "110%"}}
                src={require(
                  `../../assets/img/champion_mastery/mastery_level${c.level > 10 ? 10 : c.level}.png`,
                )}
              />
              <PercentSpan>{c.percent} %</PercentSpan>
            </Item>
          );
        })}
      </List>
      <CaptionSpan>% of games played</CaptionSpan>
      <div
        style={{
          width: "100%",
          margin: "35px 0",
          background: "rgba(255,255,255, .1)",
          height: ".5px",
        }}
      />
      <Title>Recent Activity</Title>
      <List>
        <ActivityBar
          icon={require("../../assets/img/role-icons/roleicon-fighter.png")}
          percent={counts["Fighter"] > 0 ? (counts["Fighter"] / 20) * 100 : 0}
        />
        <ActivityBar
          icon={require("../../assets/img/role-icons/roleicon-tank.png")}
          percent={counts["Tank"] > 0 ? (counts["Tank"] / 20) * 100 : 0}
        />
        <ActivityBar
          icon={require("../../assets/img/role-icons/roleicon-mage.png")}
          percent={counts["Mage"] > 0 ? (counts["Mage"] / 20) * 100 : 0}
        />
        <ActivityBar
          icon={require("../../assets/img/role-icons/roleicon-assassin.png")}
          percent={counts["Assassin"] > 0 ? (counts["Assassin"] / 20) * 100 : 0}
        />
        <ActivityBar
          icon={require("../../assets/img/role-icons/roleicon-support.png")}
          percent={counts["Support"] > 0 ? (counts["Support"] / 20) * 100 : 0}
        />
        <ActivityBar
          icon={require("../../assets/img/role-icons/roleicon-marksman.png")}
          percent={counts["Marksman"] > 0 ? (counts["Marksman"] / 20) * 100 : 0}
        />
      </List>
    </Wrapper>
  );
};
export default RecentlyPlayed;
