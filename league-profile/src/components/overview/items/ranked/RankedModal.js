import React from "react";
import styled from "styled-components";
import { Emblems } from "./utils";

const RankedBigWrapper = styled.div`
  position: absolute;
  height: 300px;
  width: 1200px;
  max-width: 68vw;
  top: -330px;
  left: -40px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  & > div:nth-child(3) {
    border: 2px solid rgb(70, 55, 20);
    background: #0a0a0a;
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
    z-index: 3;
  }
`;
const BottomLine = styled.div`
border: 1px solid rgb(70, 55, 20);
  position: absolute;
  top:92%;
  width: 97%;
  left: 50%;
transform: translate(-50%, 0);
border-radius: 6px;
  background: #0a0a0a;
  height: 30px;
  z-index: 0;
`;
const Caret = styled.img`
position: absolute;
top: 302px;
z-index: 10;
width: 30px;
height: auto;
left: 103px;
`
const LeaguesWrapper = styled.div`
  width: 73%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-around;
  border-right: 1px solid rgb(70, 55, 20);
`;
const LastSeasonWrapper = styled.div`
  width: 28%;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const SeasonBanner = styled.img`
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 32%;
  width: 85%;
  height: auto;
  position: absolute;
`;
const SeasonBannerBottom = styled.img`
  left: 50%;
  transform: translate(-50%, 0);
  position: absolute;
  top: 65px;
  width: 85%;
  height: auto;
`;

const LastSeasonCaption = styled.div`
  margin-bottom: 55px;
  & p {
    margin: 0;
    font-family: "LoL Display";
    text-transform: uppercase;
    color: rgb(60, 60, 65);
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 20px;
  }
`;

const RankedEntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  & img {
    margin: 0 auto;
    width: ${(props) => (props.present ? "125" : "133")}px;
    margin-top: ${(props) => (props.present ? "0" : "-15")}px;
    height: auto;
    margin-bottom: 25px;
  }
`;
const EntryNameCaption = styled.p`
  margin: 0 0 4px 0;
  text-transform: uppercase;
  color: ${(props) =>
    props.present ? "rgb(160, 155, 140)" : "rgb(60, 60, 65)"};
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 2px;
  font-family: "LoL Display";
`;
const RankCaption = styled.p`
  margin: 0;
  text-transform: uppercase;
  color: ${(props) =>
    props.present ? "rgb(228, 219, 200)" : "rgb(60, 60, 65)"};
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 1px;
  font-family: "LoL Display";
`;
const Line = styled.div`
  height: 1px;
  background: rgb(108, 82, 38);
  width: 80px;
  margin: 4px 0;
`;
const InfoLine = styled.p`
  margin: 0;
  font-size: 20px;
  color: rgb(160, 155, 140);
  font-size: 16px;
`;
const LineOne = styled.div`
  position: absolute;
  left: 50%;
  height: 2px;
  width: 95%;
  top: 40%;
  transform: translate(-50%, 0);
  background: rgb(95, 73, 30);
`;
const LineTwo = styled.div`
  position: absolute;
  left: 50%;
  height: 0.5px;
  width: 65%;
  top: 43%;
  opacity: 0.6;
  transform: translate(-50%, 0);
  background: rgb(95, 73, 30);
`;
const RankedEntry = ({ data, name }) => {
  console.log(data);
  return (
    <RankedEntryWrapper present={data}>
      <img
        src={
          data
            ? Emblems[data.tier]
            : require("../../../../assets/img/empty_state/profile_unranked_tooltip.png")
                .default
        }
      />
      <EntryNameCaption present={data}>{name}</EntryNameCaption>
      <RankCaption present={data}>
        {data ? `${data.tier}` : "UNRANKED"}
        {data &&
          (["GRANDMASTER", "MASTER", "CHALLENGER"].includes(data.tier)
            ? ""
            : " " + data.rank)}
      </RankCaption>
      {data ? <Line /> : null}
      {data ? (
        <InfoLine>
          {data.wins} wins {data.leaguePoints} lp
        </InfoLine>
      ) : null}
    </RankedEntryWrapper>
  );
};

const RankedModal = ({ items = [] }) => {
  return (
    <RankedBigWrapper>
      <BottomLine />
      <Caret src={require("../../../../assets/img/tooltip-caret.png").default} />
      <div>
        <LeaguesWrapper>
          <LineOne />
          <LineTwo />
          <RankedEntry
            data={items.find((entry) => entry.queueType === "RANKED_SOLO_5x5")}
            name={"Solo/Duo"}
          />
          <RankedEntry
            data={items.find((entry) => entry.queueType === "RANKED_FLEX_SR")}
            name={"FLEX 5v5"}
          />
          <RankedEntry data={null} name={"TFT"} />
        </LeaguesWrapper>
        <LastSeasonWrapper>
          <SeasonBanner
            src={require("../../../../assets/img/banners/still.png").default}
          />
          <SeasonBannerBottom
            src={
              require("../../../../assets/img/banners/trim_default.png").default
            }
          />
          <LastSeasonCaption>
            <p>Last season's Rank</p>
            <p style={{ fontSize: "18px" }}>Unranked</p>
          </LastSeasonCaption>
        </LastSeasonWrapper>
      </div>{" "}
    </RankedBigWrapper>
  );
};
export default RankedModal;
