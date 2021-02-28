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
            in my free time also besides gaming i code a LOT. My site:{" "}
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
            The Data comes from Riots api everyone can use, the App itself is
            written in React with redux & styled-components.
          </p>
          <h1>How do i use it</h1>
          <hr />
          <p>Yep enough talking here you go(press enter to go the profile):</p>
          <Search />
        </div>
      </div>
    </Wrapper>
  );
};
export default Home;
