import React from "react";
import styled from "styled-components";
import Entry from "./Entry";
import Bans from "./Bans";
import Stats from "./Stats";

const Wrapper = styled.div`
  padding: 15px 30px;
  display: flex;
`;
const StatsPart = styled.div`
  width: 80%;
  height: 100%;
  max-width: 1050px;
  @media (min-width: 1700px) {
    max-width: 1300px;

  }
  border-right: 1px solid rgba(255, 255, 255, 0.2);
`;
const ObjectivesPart = styled.div`
  width: calc(20% - 1px);
  height: 100;
  padding: 10px 0 10px 50px;
  max-width: 300px;
  @media (min-width: 1700px) {
    max-width: 400px;

  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  & div {
    :not(:first-child) {
      text-align: center;
    }
    & span {
      color: ${(props) => props.accentColor};
      letter-spacing: 1px;
      text-transform: uppercase;
      font-family: "LoL Display";
      font-size: 20px;
      font-weight: 500;
      @media (min-width: 1700px) {
        font-size: 24px;

      }
    }
    & img {
      width: 26px;
      height: auto;
      opacity: 0.5;
      @media (min-width: 1700px) {
        width: 30px;

      }
    }
  }
`;

const Team = ({ team, index }) => {
  const accentColor = index === 0 ? "rgb(10,150,170)" : "rgb(190,30,55)";

  const teamStats = {
    kills: team.players.reduce(
      (acc, val) => acc + val.playerData.stats.kills,
      0
    ),
    deaths: team.players.reduce(
      (acc, val) => acc + val.playerData.stats.deaths,
      0
    ),
    assists: team.players.reduce(
      (acc, val) => acc + val.playerData.stats.assists,
      0
    ),
    gold: team.players.reduce(
      (acc, val) => acc + val.playerData.stats.goldEarned,
      0
    ),
  };

  return (
    <Wrapper>
      <StatsPart>
        <Header accentColor={accentColor}>
          <div style={{ width: "12%" }}>
            <span>Team {index + 1}</span>
          </div>
          <div style={{ width: "20%" }}>
            <span>
              {teamStats.kills} / {teamStats.deaths} / {teamStats.assists}
            </span>
          </div>
          <div
            style={{
              width: "30%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "rgb(130, 128, 118)", fontWeight: "600" }}>
              {teamStats.gold.toLocaleString(undefined, { style: "decimal" })}
            </span>
            <img
            alt={""}
              src={require("../../assets/img/match/mask-icon-gold.png").default}
            />
          </div>
          <div style={{ width: "9%" }}>
            <img
            alt={""}
              src={
                require("../../assets/img/match/mask-icon-offense.png").default
              }
            />
          </div>
          <div style={{ width: "14%" }}>
            <img
            alt={""}
              src={require("../../assets/img/match/mask-icon-cs.png").default}
            />
          </div>
          <div style={{ width: "3%" }}>
            <img
            alt={""}
              src={require("../../assets/img/match/mask-icon-gold.png").default}
            />
          </div>
        </Header>
        {team.players.map((player, pi) => (
          <Entry
            push={index === 1 && pi > 1}
            key={player.playerData.participantId}
            data={player}
          />
        ))}
      </StatsPart>
      <ObjectivesPart>
        <Header accentColor={accentColor}>
          <div>
            <span style={{ fontWeight: "700" }}>Bans + Objectives</span>
          </div>
        </Header>
        <Bans bans={team.teamData.bans} />
        <Stats data={team.teamData} />
      </ObjectivesPart>
    </Wrapper>
  );
};
export default Team;
