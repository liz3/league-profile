import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
width: 100vw;
height: 100vh;
position: absolute;
top: 0;
left: 0;
display: flex;
`
const LeftPart = styled.div`
height: 100%;
width: 390px;

box-shadow: 22px 2px 17px 25px #000000;

`
const RightPart = styled.div`
height: 100%;
flex-grow: 1;
box-shadow: 0px 0px 49px 155px #02020e, inset 0px 0px 196px 111px #02020e;
border-radius: 20%;
`
const BackgroundShadow = () => {
    return <Wrapper>
       
        <RightPart />
    </Wrapper>
}
export default BackgroundShadow;