import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${(props) => props.size || "240px"};
  margin: 0 auto;
  @media (min-width: 1780px) {
    width: ${(props) => props.size || "300px"};
  }
  position: relative;
`;
const Background = styled.img`
  width: 100%;
  height: auto;
`;
const Badge = styled.img`
  position: absolute;
  top: 10%;
  height: auto;
  width: 25%;
  left: 0;
`;
const LevelSpan = styled.div`
  position: absolute;
  top: 10%;
  height: auto;
  width: 25%;
  left: 0;
  & span {
    @media (min-width: 1780px) {
        font-size: 18px;
    }
    color: #fff;
    font-family: "LoL Display";
    font-weight: 700;
  }
`;

const LevelBar = ({ level, size }) => {
  return (
    <Wrapper size={size}>
      <Background
        src={require("../../assets/img/level_bar/level-bar-bottom.png").default}
      />
      <Badge
        src={require("../../assets/img/level_bar/level-bar-top.png").default}
      />
      <LevelSpan>
        <span>{level}</span>
      </LevelSpan>
    </Wrapper>
  );
};

export default LevelBar;
