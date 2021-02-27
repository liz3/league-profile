import React from 'react';
import styled from 'styled-components'
import {withRouter, Link} from 'react-router-dom';
import {useSelector} from 'react-redux'

const NavigationWrapper = styled.div`
display: flex;
position: absolute;
top: 20px;
left: 400px;

`
const Item = styled.span`
text-transform: uppercase;
color: #${props => props.active ? 'fff' : 'c7b184'};
font-family: 'LoL Display';
font-weight: 600;
margin: 0 19px;
:hover {
    color: #fff;
    cursor: pointer;
}

`
const Navigation = ({location, match}) => {
    const user = useSelector((state) => state.data.profile);
    console.log(location)
    return <NavigationWrapper>
        <Link to={`/profile/${user.region}/${user.user.name}`}><Item >Overview</Item></Link>
     <Link to={`/profile/${user.region}/${user.user.name}/matchlist`}>   <Item>Match History</Item></Link>
    </NavigationWrapper>
}

export default withRouter(Navigation)