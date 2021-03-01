import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {Emblems, sortRanked, QueueNames} from './utils'
import RankedModal from './RankedModal'


const Wrapper = styled.div`
  min-height: 310px;
  @media (min-width: 1780px) {
    min-height: 375px;

  }
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
  @media (min-width: 1780px) {
    font-size: 24px;

  }
`;
const CaptionSmall = styled.p`
  margin: 0;
  color: #fff;
  font-family: "LoL Display";
  font-weight: 700;
  font-size: 15px;
  @media (min-width: 1780px) {
    font-size: 17px;

  }
`;
const Image = styled.img`
  margin-top: ${props => props.empty ? 35 :30}px;
  width: ${props => props.empty ? 200 : 150}px;
  height: auto;
  @media (min-width: 1780px) {

    margin-top: ${props => props.empty ? 50 :45}px;
    width: ${props => props.empty ? 230 : 180}px;
  }
`;



const EmptyState = () => {
  return (
    <Wrapper>
    
      <Caption>SOLO/DUO</Caption>
      <CaptionSmall>UNRANKED</CaptionSmall>
      <Image
        empty
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
  const item = sortRanked(user.ranked || [])[0];

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
