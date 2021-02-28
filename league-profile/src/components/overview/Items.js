import React from "react";
import styled from "styled-components";
import SimpleItem from "./items/SimpleItem";
import Ranked from "./items/ranked/Ranked";
import Champion from "./items/champion/ChampionMastery";

const Wrapper = styled.div`
  margin-left: 40px;
  flex-grow: 1;
  display: flex;
  & > div {
    margin-right: 50px;
    :hover > p {
      color: #fff;
    }
  }
`;
const ProfileItems = () => {
  return (
    <Wrapper>
      <Ranked />
      <SimpleItem
        name={"HONOR"}
        image={require("../../assets/img/empty_state/honor_empty.png").default}
        desc={"Other players' Honor levels are not displayed"}
      />
      <Champion />
      <SimpleItem
        name={"TROPHY"}
        push
        image={require("../../assets/img/empty_state/trophy_empty.png").default}
        desc={
          "Trophies are awarded to players that win one or more brackets in Clash."
        }
      />
      <SimpleItem
        name={"BANNER"}
        push
        right
        image={require("../../assets/img/empty_state/banner_empty.png").default}
        desc={"Banners can be earned by participation in Clash."}
      />
    </Wrapper>
  );
};
export default ProfileItems;
