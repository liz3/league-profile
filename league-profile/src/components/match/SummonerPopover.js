import React from "react";
import styled from "styled-components";
import { getSummonerImage } from "../../common/utils";

const ModalRoot = styled.div`
  position: absolute;
  display: none;
  min-width: 370px;
  left: -27px;
  bottom: 30px;
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
    & span {
        color: rgb(190, 148,58);
       
        font-size: 16px;
        margin-left: 10px;
    }
    & p {
        margin: 0;
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
  width: 15px;
  height: 15px;
  @media (min-width: 1700px) {
    width: 22px;
  height: 22px;

}
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

const SummonerPopover = ({ data, patch }) => {
  return (
    <Wrapper>
      <ModalRoot>
        <BottomLine />
        <Caret alt={""} src={require("../../assets/img/tooltip-caret.png").default} />
        <ModalContent>
          <div>
            <img alt={""} src={getSummonerImage(patch, data.id)} />
            <div>
              <p>{data.name}</p>
              <span>Summoner Level: {data.summonerLevel}</span>
            </div>
          </div>
          <p dangerouslySetInnerHTML={{ __html: data.description }} />
        </ModalContent>
      </ModalRoot>
      <Image alt={""} src={getSummonerImage(patch, data.id)} />
    </Wrapper>
  );
};
export default SummonerPopover;
