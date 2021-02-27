import React from 'react';
import styled from 'styled-components';

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
`;
const Image = styled.img`
  margin-top: 35px;
  width: 205px;
  height: auto;
`;

const ModalWrapper = styled.div`
position: absolute;
left: 50%;
transform: translate(-50%, 0);
top: -115px;
box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
width: ${props => props.right ? 150 : 270}px;
background: #0a0a0a;
border: 2px solid rgb(70, 55, 20);
padding: ${props => props.right ? '10px 25px' : '20px 45px'};

& img {

  position: absolute;
  left: 50%;
transform: translate(-50%, 0);
top: 100%;

width:16px;
height: auto;
}
& span {
    color: #c7b184;

}

`

const SimpleItem = ({name, image, desc, imgStyle, right}) => {
    return <Wrapper>
        {desc ? <ModalWrapper right={right}>
        
         <img src={require("../../../assets/img/tooltip-system-caret.png").default} /> 
         
            <span>{desc}</span>
        </ModalWrapper> : null}
        <Caption>{name}</Caption>
        <Image style={imgStyle || {}} src={image} />

    </Wrapper>
}
export default SimpleItem;