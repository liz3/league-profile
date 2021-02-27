import React from 'react';
import styled from 'styled-components';
import IconImage from "../../assets/img/match/right_icons.png"

const Wrapper = styled.div`
display: flex;
margin-top: 25px;
`
const Entry = styled.div`
position: relative;
margin: 0 10px 0 0;
width: 35px;
height: 35px;
& img {
    width: 100%;
    height: auto;
  position: absolute;
  left: 0;
  top: -${props => props.index * 35}px;
  clip: rect(${props => props.index * 35}px, 80px, ${props => props.index * 35 + 35}px, 0);
}
& span {
    position: absolute;
    top: 35px;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
    color: #fff;
    font-family: "LoL Display";
    font-size: 20px;
    font-weight: 700;

}
`

const Stats = ({data}) => {

    return <Wrapper>
        <Entry index={0}>
            <img src={IconImage} />
            <span>{data.towerKills}</span>
        </Entry>
        <Entry index={1}>
            <img src={IconImage} />
            <span>{data.inhibitorKills}</span>
        </Entry>
        <Entry index={2}>
            <img src={IconImage} />
            <span>{data.baronKills}</span>
        </Entry>
        <Entry index={3}>
            <img src={IconImage} />
            <span>{data.dragonKills}</span>
        </Entry>
        <Entry index={4}>
            <img src={IconImage} />
            <span>{data.riftHeraldKills}</span>
        </Entry>
    </Wrapper>
}
export default Stats;