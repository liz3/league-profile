import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {Emblems} from './utils'
import RankedModal from './RankedModal'
const QueueNames = {
  RANKED_SOLO_5x5: "SOLO/DUO",
  RANKED_FLEX_SR: "FLEX 5V5"
};

const Wrapper = styled.div`
  min-height: 310px;
  text-align: center;
  position: relative;
  & > div {
    display: none;
    opacity: 0;
    transition: opacity .3s ease;
  }
  &:hover > div {
    display: flex;
    opacity: 1;
  }
`;
const Caption = styled.p`
  margin: 0;
  color: #c7b184;
  font-family: "LoL Display";
  font-weight: 700;
  font-size: 20px;
`;
const CaptionSmall = styled.p`
  margin: 0;
  color: #fff;
  font-family: "LoL Display";
  font-weight: 700;
  font-size: 15px;
`;
const Image = styled.img`
  margin-top: 30px;
  width: 150px;
  height: auto;
`;



const EmptyState = () => {
  return (
    <Wrapper>
    
      <Caption>SOLO/DUO</Caption>
      <CaptionSmall>UNRANKED</CaptionSmall>
      <Image
        style={{width: "200px", marginTop: "35px"}}
        src={
          require("../../../../assets/img/empty_state/profile_unranked.png")
            .default
        }
      />
      <RankedModal />
    </Wrapper>
  );
};

const Ranked = () => {
  const user = useSelector((state) => state.data.profile);

  if (!user.ranked || user.ranked.length === 0) return <EmptyState />;
  const item = user.ranked[0];

  return (
    <Wrapper>
      <Caption>{QueueNames[item.queueType]}</Caption>
      <CaptionSmall>
        {item.tier}
        {["GRANDMASTER", "MASTER", "CHALLENGER"].includes(item.tier)
          ? ""
          : " " + item.rank}
      </CaptionSmall>
      <Image src={Emblems[item.tier]} />
      <RankedModal items={user.ranked} />
    </Wrapper>
  );
};
export default Ranked;
