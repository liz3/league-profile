import React from "react";
import styled from "styled-components";
import { getRuneImg } from "../../common/utils";

const ModalRoot = styled.div`
  position: absolute;
  display: none;
  min-width: 370px;
  left: -18px;
  bottom: 50px;
`;
const ModalContent = styled.div`
background rgb(1,10,19);
    border: 2px solid rgb(95,73,30);
    z-index: 3;
    position: relative;
    word-break: break-word;
&> div {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 15px 0 15px 20px;
    & img {
      width: 70px;
      height: auto;
      border: 1px solid grey;
    }
    & p {
        margin-left: 10px;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-family: "LoL Display";
        font-size: 20px;
       
        color: #fff;
        font-weight: 700;
    }
}
& > p {
      margin: 0 20px 20px 20px;

      color: rgb(240, 230, 210);
      font-size: 14px;
}
`;

const Wrapper = styled.div`
  position: relative;
  width: 36px;
  &:hover ${ModalRoot} {
    display: block;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;
const BottomLine = styled.div`
  border: 1px solid rgb(70, 55, 20);
  position: absolute;
  bottom: -4px;
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
  bottom: -16px;
  z-index: 10;
  width: 30px;
  height: auto;
  left: 20px;
`;

const RunePopover = ({ data }) => {
  return (
    <Wrapper>
      <ModalRoot>
        <BottomLine />
        <Caret src={require("../../assets/img/tooltip-caret.png").default} />
        <ModalContent>
          <div>
            <img src={getRuneImg(data.rune.icon)} />
            <p>{data.rune.name}</p>
          </div>
          <p dangerouslySetInnerHTML={{ __html: data.rune.shortDesc }} />
        </ModalContent>
      </ModalRoot>
      <Image src={getRuneImg(data.rune.icon)} />
    </Wrapper>
  );
};
export default RunePopover;
