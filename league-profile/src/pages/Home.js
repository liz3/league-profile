import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
display: flex;
width: 100%;
justify-content: center;
& > div {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    border: 2px solid rgb(70, 55, 20);
    background: #0a0a0a;
    padding: 15px;
}
`

const Home = () => {

    return <Wrapper>
        
    </Wrapper>;
}
export default Home;
