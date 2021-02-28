import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
position: absolute;
height: 100vh;
width: 100vw;
background: rgba(0,0,0,.8);
display: flex;
justify-content: center;
align-items: center;
z-index: 400;
`;
const ContentWrapper = styled.div`
position: relative;
& > div:nth-child(2) {
    position: relative;
    background rgb(1,10,19);
    border: 2px solid rgb(95,73,30);
    z-index: 3;
    max-width: 380px;
   
}
`
const BottomLine = styled.div`
  border: 1px solid rgb(70, 55, 20);
  position: absolute;
  top: -4px;
  width: 93%;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 6px;
  background: #0a0a0a;
  height: calc(100% + 6px);
  z-index: 0;
`;
const Header = styled.p`
text-transform: uppercase;
font-family: 'Lol Display';
text-align: center;
color: rgb(240, 230, 210);
margin: 0;
font-size: 25px;
padding: 15px 15px;
letter-spacing: 1px;
font-weight: 700;

`
const Caption = styled.p`
font-family: 'Lol Body';
text-align: center;
color: rgb(160, 155, 140);
margin: 0;
font-size:18px;
padding: 10px 25px;

`
const Button = styled.div`
width:75px;
padding: 2px;
background: linear-gradient(0deg, rgba(200,170,109,1) 0%, rgba(120,91,40,1) 100%);
margin:10px auto 0 auto ;
: hover {
    & > div {
        background: rgb(91,68,39);
    }
    background: linear-gradient(0deg, rgba(239,229,213,1) 0%, rgba(200,156,60,1) 100%);
    cursor: pointer;
}
& > div {
    background: rgb(81,58,29);
    padding:12px 20px 8px 20px;
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.16), inset 0 3px 6px rgba(0, 0, 0, 0.23);
    text-align: center;

    & span{
        color: rgb(205,190,145);
        font-family: 'Lol Body';
        font-weight: 700;
        font-size: 20px;
    }
}
`

const PopUp = ({text, onClick, title}) => {

    return <Wrapper>
        <ContentWrapper>
            <BottomLine />
            <div>
                <Header>{title}</Header>
                <Caption>{text}</Caption>

                <Button onClick={() => onClick()}><div><span>OK</span></div></Button>
            </div>
        </ContentWrapper>
    </Wrapper>
}
export default PopUp;