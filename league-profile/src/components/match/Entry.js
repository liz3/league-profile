import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getChampionAvatar, getEntryFromId, getRune } from "../../common/utils";
import RunePopover from "./RunePopOver";
import SummonerPopover from "./SummonerPopover";
import ItemPopover from "./ItemPopover";
import { setData } from "../../common/reducers/context_menu/actions";
import Api from "../../common/Api";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 5px 0;
`;
const MetaWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 35%;
`;
const LevelSpan = styled.p`
  font-size: 18px;
  @media (min-width: 1780px) {
    font-size: 23px;

}
  color: ${(props) =>
    props.focused ? "rgb(241, 184,11)" : "rgb(240, 230, 210)"};
  font-weight: ${(props) => (props.focused ? "700" : "500")};
  font-family: "LoL Display";
  margin: 0 9px;
  width: 18px;
  text-align: center;
`;
const NameSpan = styled.p`
  font-size: 16px;
  color: ${(props) =>
    props.focused ? "rgb(241, 184,11)" : "rgb(157, 152, 138)"};
  font-weight: ${(props) => (props.focused ? "700" : "500")};
  font-family: "LoL Body";
  margin: 0 9px;
  letter-spacing: 1px;
  @media (min-width: 1780px) {
    font-size: 19px;

}
`;
const ChampionImage = styled.img`
  border-radius: 50%;
  border: 3px solid
    ${(props) => (props.focused ? "rgb(241, 184,11)" : "rgb(171, 134, 46)")};
  width: 40px;
  height: auto;
  margin: 0 4px;
  @media (min-width: 1780px) {
    width: 48px;

}
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 26%;
`;
const StatsWrapper = styled.div`
  width: 10%;
  margin: auto 0;
  text-align: center;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & span {
    text-align: center;
  }
  @media (min-width: 1780px) {
      font-size: 21px;
  }
  color: ${(props) =>
    props.focused ? "rgb(241, 184,11)" : "rgb(240, 230, 210)"};
  font-weight: 700;
`;
const CsWrapper = styled.div`
  width: 14%;
  margin: auto 0;
  text-align: center;
  letter-spacing: 1px;
  & span {
    text-align: center;
  }
  @media (min-width: 1780px) {
    font-size: 21px;
}
  color: ${(props) =>
    props.focused ? "rgb(241, 184,11)" : "rgb(240, 230, 210)"};
  font-weight: 700;
`;
const GoldWrapper = styled.div`
  width: 14%;
  margin: auto 0;
  text-align: left;
  letter-spacing: 1px;
  & span {
    text-align: left;
  }
  @media (min-width: 1780px) {
    font-size: 21px;
}
  color: ${(props) =>
    props.focused ? "rgb(241, 184,11)" : "rgb(240, 230, 210)"};
  font-weight: 700;
`;
const KeyHostMap = {
  br: "BR1",
  eune: "EUN1",
  euw: "EUW1",
  jp: "JP1",
  kr: "KR",
  "la-one": "LA1",
  "la-two": "LA2",
  na: "NA1",
  oc: "OC1",
  tr: "TR1",
  ru: "RU",
};

const Entry = ({ data, push, platformId, region }) => {
  const dispatch = useDispatch();
  const patch = useSelector((state) => state.data.leagueData.version);
  const { runes, summoners, items } = useSelector(
    (state) => state.data.leagueMatchData
  );
  const navigate = useNavigate();
  const { champions } = useSelector((state) => state.data.leagueData);
  const keyStone = getRune(runes, data.playerData.perks.styles[0].selections[0].perk);
  const champion = getEntryFromId(champions, data.playerData.championId);
  return (
    <Wrapper
      onContextMenu={(ev) => {
        ev.preventDefault();
        dispatch(
          setData({
            x: ev.clientX,
            y: ev.clientY,
            items: [
              {
                key: "item_set",
                name: "Import Item Set",
                handler: () => {
                  alert("Item set");
                },
              },
              {
                key: "view_profile",
                name: "View Profile",
                handler: () => {
              
                  Api.getProfileBySummonerId(
                    region,
                    data.player.summonerId
                  ).then((res) => {
                    navigate(
                      `/profile/${region}/${encodeURIComponent(
                        res.data.user.name
                      )}/${encodeURIComponent(
                        res.data.user.tag
                      )}`
                    );
                  });
                },
              },
            ],
          })
        );
      }}
    >
      <MetaWrapper>
        <RunePopover data={keyStone} />
        <div>
          <SummonerPopover
            patch={patch}
            data={getEntryFromId(summoners, data.playerData.summoner1Id)}
          />
          <SummonerPopover
            patch={patch}
            data={getEntryFromId(summoners, data.playerData.summoner2Id)}
          />
        </div>
        <LevelSpan focused={data.focused}>
          {data.playerData.champLevel}
        </LevelSpan>
        <ChampionImage
          focused={data.focused}
          src={getChampionAvatar(patch, champion.id)}
        />
        <NameSpan focused={data.focused}>{data.playerData.riotIdGameName}</NameSpan>
      </MetaWrapper>
      <ItemWrapper>
        {Array(7)
          .fill()
          .map((_, index) => {
            return (
              <ItemPopover
                push={push}
                patch={patch}
                key={index}
                data={items[data.playerData[`item${index}`]]}
                id={data.playerData[`item${index}`]}
              />
            );
          })}
      </ItemWrapper>
      <StatsWrapper focused={data.focused}>

        <span>{data?.playerData?.kills}</span>/
        <span>{data?.playerData?.deaths}</span>/
        <span>{data?.playerData?.assists}</span>
      </StatsWrapper>
      <CsWrapper focused={data.focused}>
        <span>
          {" "}
          {data.playerData.neutralMinionsKilled +
            data.playerData.totalMinionsKilled}
        </span>
      </CsWrapper>
      <GoldWrapper focused={data.focused}>
        <span>
          {data.playerData.goldEarned.toLocaleString(undefined, {
            style: "decimal",
          })}
        </span>
      </GoldWrapper>
    </Wrapper>
  );
};
export default Entry;
