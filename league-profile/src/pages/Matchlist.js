import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  loadProfile,
  loadMatchlist,
  setPage,
} from "../common/reducers/data/actions";
import BackgroundShadow from "../components/BackgroundShadow";
import MatchlistRoot from "../components/matchlist/MatchlistRoot";
import Banner from "../components/overview/Banner";
import Search from "../components/Search";

const RootWrapper = styled.div`
  transition: opacity 0.4s ease;
  opacity: ${(props) => (props.active ? 1 : 0)};
  height: 100%;
  position: relative;
`;
const SearchContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 60px;
  z-index: 300;
`;

const Matchlist = ({ match }) => {
  const dispatch = useDispatch();
  const { region, name } = match.params;
  useEffect(() => {
    dispatch(setPage("matchlist"));
    dispatch(loadProfile(region, name)).then((res) => {
      dispatch(loadMatchlist());
    });
  }, [region, name, dispatch]);
  const user = useSelector((state) => state.data.profile);

  return (
    <RootWrapper active={user.loaded}>
      {user.loaded ? (
        <>
          <BackgroundShadow />
          <Banner simple />
          <SearchContainer>
            <Search />
          </SearchContainer>
          <MatchlistRoot />
        </>
      ) : null}
    </RootWrapper>
  );
};
export default Matchlist;
