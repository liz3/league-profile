import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavigationWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  left: 400px;
  @media (min-width: 1780px) {
    left: 450px;
  }
`;
const Item = styled.span`
  position: relative;
  text-transform: uppercase;
  color: #${(props) => (props.active ? "fff" : "c7b184")};
  font-family: "LoL Display";
  font-weight: 600;
  margin: 0 19px;

  @media (min-width: 1780px) {
    margin: 0 24px;
    font-size: 20px;
  }
  :hover {
    color: #fff;
    cursor: pointer;
  }
`;
const Line = styled.div`
  position: absolute;
  top: 103%;
  width: 115%;
  left: 50%;
  transform: translate(-50%, 0);
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(192, 179, 137, 1) 50%,
    rgba(0, 0, 0, 0.25) 100%
  );
`;
const Navigation = () => {
  const user = useSelector((state) => state.data.profile);
  console.log(user)
  const page = useSelector((state) => state.data.activePage);
  return (
    <NavigationWrapper>
      <Link to={`/profile/${user.region}/${user.user.name}/${user.user.tag}`}>
        <Item active={page === "profile"}>
          Overview{page === "profile" ? <Line /> : null}
        </Item>
      </Link>
      <Link to={`/profile/${user.region}/${user.user.name}/${user.user.tag}/matchlist`}>
        <Item active={page === "matchlist"}>
          Match History{page === "matchlist" ? <Line /> : null}
        </Item>
      </Link>
    </NavigationWrapper>
  );
};

export default Navigation;
