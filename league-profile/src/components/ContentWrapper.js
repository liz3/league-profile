import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadLeagueData } from "../common/reducers/data/actions";
import { getChampionSplash, getEntryFromId } from "../common/utils";
import Navigation from "./Navigation";
import { withRouter } from "react-router-dom";
import ContextMenu from "./ContextMenu";
import { setData } from "../common/reducers/context_menu/actions";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 2px);
  background: url("${(props) => props.splash}");
  border-top: 2px solid #4a3820;
  background-size: cover;
`;

const ContextMenuWrapper = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.context_menu);
  if (!data) return null;

  return (
    <ContextMenu
      left={data.x}
      top={data.y}
      onTrigger={(key) => {
        data.items.find((item) => item.key === key).handler();
        dispatch(setData(null));
      }}
      items={data.items}
    />
  );
};

const ContentWrapper = ({ children, location }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLeagueData());
  }, [dispatch]);
  const ctx_menu = useSelector((state) => state.context_menu);

  const { loaded, champions } = useSelector((state) => state.data.leagueData);
  const user = useSelector((state) => state.data.profile);

  if (!loaded) return null
  const champEntryMostPlayed = user.loaded ?  getEntryFromId(
    champions,
    user.mostPlayed.champId
  ) : null
  const isMatchlist = location.pathname.includes("/matchlist");
  return (
    <Wrapper
      onClick={(ev) => {
        if (ctx_menu) {
          ev.preventDefault();
          dispatch(setData(null));
        }
      }}
      splash={champEntryMostPlayed ? getChampionSplash(champEntryMostPlayed.id) : null}
    >
      <ContextMenuWrapper />
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `rgba(0,0,0,${isMatchlist ? ".85" : ".3"})`,
        }}
      >
        {children}
        {user.loaded ? <Navigation /> : null}
      </div>
    </Wrapper>
  );
};
export default withRouter(ContentWrapper);
