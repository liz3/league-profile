import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 0 15px;

`
const Content = styled.div`
padding: 2px;

`
const Image = styled.img`
width: 24px;
height: auto;
margin-top: 15px;
@media (min-width: 1780px) {
    width: 32px;
    margin-top: 18px;

}
`
const BackgroundPart = styled.div`
background: rgb(30, 35, 40);
width: 8px;
height: 150px;
@media (min-width: 1780px) {
    width: 12px;
    height: ${150 * 1.4}px;
}
position: relative;

`
const FilledPart = styled.div`
background: linear-gradient(90deg, rgba(21,224,209,1) 0%, rgba(0,151,175,1) 100%);
position: absolute;
top:${props => 150 - props.percent}px;
height: ${props => props.percent}px;
left: 0;
width: 8px;

@media (min-width: 1780px) {
    top:${props => (150 - props.percent) * 1.4}px;
    height: ${props => props.percent * 1.4}px;
    width: 12px;
}
`

const ActivityBar = ({icon, percent}) => {

    return <Wrapper>
        <div style={{background: 'linear-gradient(90deg, rgba(120,90,40,1) 0%, rgba(53,42,17,1) 100%)'}}>

            <Content>
            <BackgroundPart>

<FilledPart percent={percent * 1.5} />
</BackgroundPart>
            </Content>
        </div>
        <Image src={icon} />
    </Wrapper>
}
export default ActivityBar;