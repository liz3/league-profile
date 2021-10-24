import React from "react";
import styled from "styled-components";
import BackgroundImage from "../../assets/img/match/background.jpg";
import { useSelector } from "react-redux";
import { mapMatchData } from "./utils";
import Head from "./Head";
import Team from "./Team";
import { withRouter } from "react-router-dom";
import PopUp from "../PopUp";

const RootWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.userPresent ? "calc(100% - 2px)" : "100%")};
  background: url(${BackgroundImage});
  background-size: cover;
  position: relative;
  border-top: ${(props) =>
    props.userPresent ? "2px solid rgb(95,73,30)" : "none"};
`;
const TeamsWrapper = styled.div`
  width: 100%;
  margin-top: 5px;
`;
const CloseButton = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(
    140deg,
    rgba(199, 162, 85, 1) 0%,
    rgba(70, 55, 20, 1) 100%
  );
  padding: 3px;
  right: 40px;
  top: -18px;
  & > div {
    border-radius: 50%;
    padding: 5px;
    background: rgb(30, 35, 40);
    & img {
      display: block;
      width: 24px;
      height: auto;
      border-radius: 50%;
    }
  }
  &:hover {
    cursor: pointer;
    background: linear-gradient(
      140deg,
      rgba(238, 226, 202, 1) 0%,
      rgba(202, 159, 67, 1) 100%
    );
  }
`;

const MatchRoot = ({
  summonerId,
  userPresent,
  history,
  failed,
  ready,
  loading,
}) => {
  const data = useSelector((state) => state.data.match);
  const mapped = data.loaded ? mapMatchData(data, summonerId) : null;

  return (
    <RootWrapper userPresent={userPresent}>
      {!mapped && !loading && !failed ? (
        <PopUp
          title={"Summoner not present"}
          text={"This match exists but the user isnt present in it :("}
          onClick={() => history.push("/")}
        />
      ) : null}
      {failed ? (
        <PopUp
          title={"Match not found"}
          text={"This match was not found, maybe a wrong region? "}
          onClick={() => history.push("/")}
        />
      ) : null}
      {userPresent ? (
        <CloseButton onClick={() => history.go(-1)}>
          <div>
            <img
              alt={""}
              src={require("../../assets/img/x_mask.png").default}
            />
          </div>
        </CloseButton>
      ) : null}
      {mapped && ready ? <Head data={mapped} /> : null}
      {mapped && ready ? (
        <TeamsWrapper>
          {mapped.teams.map((entry, index) => (
            <Team key={entry.id} platformId={data.info.platformId} index={index} team={entry} />
          ))}
        </TeamsWrapper>
      ) : null}
    </RootWrapper>
  );
};
export default withRouter(MatchRoot);
