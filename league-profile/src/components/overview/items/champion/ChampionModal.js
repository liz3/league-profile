import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ChampImg from "./ChampImg";
import { getEntryFromId } from "../../../../common/utils";

const Wrapper = styled.div`
position: absolute;

top: -385px;
left: 50%;
transform: translate(-50%, 0);
& > div:nth-child(3) {
    padding: 20px 45px;
    background rgb(1,10,19);
    border: 2px solid rgb(95,73,30);
    z-index: 3;
    position: relative;
}
`;

const BottomLine = styled.div`
  border: 1px solid rgb(70, 55, 20);
  position: absolute;
  top: 92%;
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
  top: 354px;
  z-index: 10;
  width: 30px;
  height: auto;
  left: 50%;
  transform: translate(-50%, 0);
`;
const LineOne = styled.div`
  position: absolute;
  left: 50%;
  height: 2px;
  width: 85%;
  top: 50%;
  transform: translate(-50%, 0);
  background: rgb(95, 73, 30);
`;
const LineTwo = styled.div`
  position: absolute;
  left: 50%;
  height: 0.5px;
  width: 65%;
  top: 53%;
  opacity: 0.6;
  transform: translate(-50%, 0);
  background: rgb(95, 73, 30);
`;

const Title = styled.p`
  margin: 7px 0 15px 0;
  font-family: "LoL Display";
  font-weight: 700;
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
  color: rgb(240, 230, 210);
`;

const EntriesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 230px;
  margin-bottom: 30px;
`;

const EntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 100%;
  justify-content: space-between;
  & > div:nth-child(2) {
    & > p {
      margin: 30px 0 0 0;
      font-family: "LoL Display";
      color: rgb(240, 230, 210);
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
    }
    & > span {
      font-family: "LoL Display";
      color: rgba(240, 230, 210, 0.9);
      font-size: 16px;
      font-weight: 200;
    }
  }
`;

const Entry = ({ data, size, adjust }) => {
  const { loaded, champions } = useSelector((state) => state.data.leagueData);
  if (!loaded) return null;
  const entry = getEntryFromId(champions, data.championId);

  return (
    <EntryWrapper adjust={adjust}>
      <div style={{ marginTop: adjust ? "30px" : "0" }}>
        <ChampImg
          size={size}
          champId={data.championId}
          level={data.championLevel}
          offset
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <p>{entry.name}</p>
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgb(70,55,20)",
            margin: "2px 0",
          }}
        />
        <span>
          {data.championPoints.toLocaleString(undefined, { style: "decimal" })}{" "}
          pts
        </span>
      </div>
    </EntryWrapper>
  );
};

const ChampionModal = ({ champs }) => {
  return (
    <Wrapper>
      <BottomLine />
      <Caret
        src={require("../../../../assets/img/tooltip-caret.png").default}
      />
      <div>
        <Title>HIGHEST CHAMPION MASTERY</Title>
        <LineOne />
        <LineTwo />
        <EntriesWrapper>
          <Entry data={champs[1]} size={"105px"} adjust />
          <Entry data={champs[0]} size={"130px"} />
          <Entry data={champs[2]} size={"105px"} adjust />
        </EntriesWrapper>
      </div>
    </Wrapper>
  );
};
export default ChampionModal;
