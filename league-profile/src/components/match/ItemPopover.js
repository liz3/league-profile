import React from "react";
import styled from "styled-components";
import { getItemImage, getRuneImg, getSummonerImage } from "../../common/utils";

const ModalRoot = styled.div`
  position: absolute;
  display: none;
  min-width: 370px;
  right: 45px;
  ${props => props.push ? 'bottom' : 'top'}: 0;
  ${props => !props.push && `transform: translate(0, -50%);`}
  z-index: 60;
`;
const ModalContent = styled.div`
background rgb(1,10,19);
    border: 2px solid rgb(95,73,30);
    z-index: 3;
    padding: 10px;
    position: relative;
    word-break: break-word;
&> div {
    display: flex;
   
    width: 100%;
    margin: 15px 0 15px 20px;
    & > img {
      width: 70px;
      height: auto;
      border: 1px solid grey;
    }
    & span {
        color: rgb(240, 230, 210);
       
        font-size: 16px;
        margin-left: 4px;
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
      & passive {
        color: gold;

    }
      & active {
        color: gold;

    }
    & stats {
        color: rgb(5,150,170);
        margin-bottom: 4px;
    }
}
`;

const Wrapper = styled.div`
  position: relative;
  width: 34px;
  height: 34px;
  &:hover ${ModalRoot} {
    display: block;
  }
`;

const Image = styled.img`
  width: 32px;
  height: auto;
  border: 1px solid rgb(70, 55, 20);
`;
const BottomLine = styled.div`
  border: 1px solid rgb(70, 55, 20);
  position: absolute;
  right: -3px;
  height: 97%;
  top: 50%;
  transform: translate(0, -50%);
  border-radius: 6px;
  background: #0a0a0a;
  width: 30px;
  z-index: 1;
`;
const Caret = styled.img`
  position: absolute;
  right: -21px;
  z-index: 10;
  width: 30px;
  height: auto;
  ${props => props.push ? 'bottom: 10px;' :'top: 54%;'}

  
  transform: rotate(-90deg);
`;

const ItemPopover = ({ data, patch, id, push }) => {
  return (
    <Wrapper>
      {data ? (
        <ModalRoot push={push}>
          <BottomLine />
          <Caret push={push} src={require("../../assets/img/tooltip-caret.png").default} />
          <ModalContent >
            <div>
              <img src={getItemImage(patch, id)} />
              <div>
                <p>{data.name}</p>
               <div style={{display: 'flex', alignItems: 'center', marginLeft: "10px"}}>
               <img
                  style={{  width: "24px", height: "auto"}}
                  src={
                    require("../../assets/img/match/mask-icon-gold.png").default
                  }
                />
                <span>{data.gold.total}</span>
               </div>
              </div>
            </div>
            <p dangerouslySetInnerHTML={{ __html: data.description }} />
          </ModalContent>
        </ModalRoot>
      ) : null}
      {data ? (
        <Image src={getItemImage(patch, id)} />
      ) : (
        <div
          style={{
            border: "1px solid rgb(70, 55, 20)",
            width: "32px",
            height: "32px",
            background: "rgb(2,11,21)",
          }}
        />
      )}
    </Wrapper>
  );
};
export default ItemPopover;
