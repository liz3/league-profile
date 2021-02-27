import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loadProfile } from "../common/reducers/data/actions";
import BackgroundShadow from "../components/BackgroundShadow";
import Banner from "../components/overview/Banner";
import ProfileItems from "../components/overview/Items";
import Search from "../components/Search";

const RootWrapper = styled.div`
  transition: opacity 0.4s ease;
  opacity: ${(props) => (props.active ? 1 : 0)};
  display: flex;
  height: 100%;
  position: relative;
`;
const ContentHolder = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100%;
  align-items: flex-end;
`;
const SearchContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 60px;
`;
const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const { region, name } = match.params;
const [loading, setLoading] = useState(false)
  useEffect(() => {

    setLoading(true)
    dispatch(loadProfile(region, name)).then(res => {
        setLoading(false)
    })
  }, [region, name, dispatch]);
  const user = useSelector((state) => state.data.profile);

  return (
    <RootWrapper active={user.loaded}>
      {user.loaded && !loading ? (
        <>
          <BackgroundShadow />
          <Banner />
          <SearchContainer>
            <Search />
          </SearchContainer>
          <ContentHolder>
            <ProfileItems />
          </ContentHolder>
        </>
      ) : null}
    </RootWrapper>
  );
};
export default Profile;
