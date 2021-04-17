import React, { useEffect } from "react";
import styled from "styled-components";
import Search from "../components/Search";
import { useDispatch } from "react-redux";
import { setPage } from "../common/reducers/data/actions";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  & > div:nth-child(1) {
    margin: 60px;

    min-width: 30vw;
    max-width: 700px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    border: 2px solid rgb(70, 55, 20);
    background: #0a0a0a;
    padding: 15px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgb(120, 90, 40);
      border-radius: 10px;
    }

    & > div:nth-child(1) {
      font-family: "LoL Body";
      & h1 {
        color: rgb(240, 230, 210);
      }
      & hr {
        border-color: rgb(70, 55, 20);
      }
      & p {
        color: rgb(160, 155, 140);
      }
    }
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage("homw"));
  }, [dispatch]);
  return (
    <Wrapper>
      <div>
        <div>
          <h1>Welcome</h1>
          <hr />
          <p>
            My name is Yann "Liz3" HN and i have a big passion for League, in
            the game i am a passionated Xayah OTP playing in{" "}
            <span style={{ fontStyle: "italic" }}>Shit elo</span>, as a Job and
            in my free time besides gaming & cars i code a LOT. My site:{" "}
            <a href={"https://liz3.net"} target={"_blank"} rel="noreferrer">
              Liz3.net
            </a>
          </p>
          <h1>What is League Profile</h1>
          <hr />
          <p>
            League profile is my attempt to recreate the League Clients Profile
            page/matchlist and partial match page in React, the project came
            together in about 4 days and was nothing but a 4fun thing. But maybe
            now riot would hire me? never tried.
          </p>
          <h1>What is this build on/uses</h1>
          <hr />
          <p>
            Only icons and some images are actually from riots LCU client,
            otherwise everything else is custom.
          </p>
          <p>
            You can see its source here:{" "}
            <a href={"https://github.com/liz3/league-profile"} target="_blank">
              https://github.com/liz3/league-profile
            </a>
          </p>
          <p>
            The Data comes from Riots api everyone can use, the App itself is
            written in React with redux & styled-components.
          </p>
          <h1>How do i use it</h1>
          <hr />
          <p>
            Yep enough talking here you go(press enter to go to the profile):
          </p>
          <Search />

          <h1>Please note:</h1>
          <hr />
          <p>
            Do NOT use this on mobile as it will not look represantive and
            rather cursed. If you want this to look as close as the actual
            client use a 1080p res or 720p (ish) as the site has a breakpoint at
            1780px but a lot of image sizes are NOT responsive.
          </p>
          <p>
            lol-profile.com isn't endorsed by Riot Games and doesn't reflect the
            views or opinions of Riot Games or anyone officially involved in
            producing or managing League of Legends. League of Legends and Riot
            Games are trademarks or registered trademarks of Riot Games, Inc.
            League of Legends © Riot Games, Inc.
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Home;
