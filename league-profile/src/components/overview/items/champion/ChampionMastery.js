import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ChampImg from "./ChampImg";
import ChampionModal from "./ChampionModal";

const Wrapper = styled.div`
  min-height: 310px;
  @media (min-width: 1700px) {
    min-height: 375px;
  }
  text-align: center;
  position: relative;
  & > div:nth-child(1) {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover > div:nth-child(1) {
    display: block;
    opacity: 1;
  }
`;
const Caption = styled.p`
  margin: 0;
  color: #c7b184;
  font-family: "LoL Display";
  font-weight: 700;
  font-size: 20px;
  white-space: nowrap;
  @media (min-width: 1700px) {
    font-size: 24px;
  }
`;
const CaptionSmall = styled.p`
  margin: 0;
  color: #fff;

  font-family: "LoL Display";
  font-weight: 700;
  font-size: 28px;
  @media (min-width: 1700px) {
    font-size: 32px;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  @media (min-width: 1700px) {
    margin-top: 28px;
  }
`;

const Champion = () => {
  const user = useSelector((state) => state.data.profile);

  const champs = user.champs || [];
  return (
    <Wrapper>
      <ChampionModal champs={champs} />
      <Caption>MASTERY SCORE</Caption>
      <CaptionSmall>{user.masteryAmount}</CaptionSmall>
      <Container>
        <ChampImg
          champId={champs[0].championId}
          level={champs[0].championLevel}
        />
      </Container>
    </Wrapper>
  );
};
export default Champion;
