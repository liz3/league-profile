import React from "react";
import styled from "styled-components";

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
    transition: opacity 0.3s ease;
  }

  &:hover > div {
    display: block;
    opacity: 1;
  }

  z-index: 0;
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
const Image = styled.img`
  margin-top: ${props => props.push ? 50 : 35}px;
  width: 205px;
  height: auto;
  @media (min-width: 1780px) {
    width: 250px;
    margin-top: ${props => props.push ? 70 : 48}px;

  }
`;

const ModalWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: -115px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  width: ${(props) => (props.right ? 150 : 270)}px;
  background: #0a0a0a;
  border: 2px solid rgb(70, 55, 20);
  padding: ${(props) => (props.right ? "10px 25px" : "20px 45px")};
  @media (min-width: 1780px) {
    top: -140px;

  }
  & img {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: 100%;
    @media (min-width: 1780px) {
      width: 20px;
    }
    width: 16px;
    height: auto;
  }
  & span {
    @media (min-width: 1780px) {
        font-size: 18px;
    }
    color: #c7b184;
  }
`;

const SimpleItem = ({ name, image, desc, right, push}) => {
  return (
    <Wrapper>
      {desc ? (
        <ModalWrapper right={right}>
          <img
          alt={""}
            src={
              require("../../../assets/img/tooltip-system-caret.png").default
            }
          />

          <span>{desc}</span>
        </ModalWrapper>
      ) : null}
      <Caption>{name}</Caption>
      <Image push={push} src={image} />
    </Wrapper>
  );
};
export default SimpleItem;
