import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getProfilePictureUrl } from "../../common/utils";
import BannerBaseImage from "../../assets/img/banners/default.png";
import LevelBar from "./LevelBar";
import Challenges from "./Challenges";

const getFileForBorder = (level) => {
  if (level >= 500) return 21;
  if (level < 30) return 1;
  if (level < 50) return 2;
  const count = Math.floor(level / 25) + 1;
  return count;
};

const Wrapper = styled.div`
  width: 390px;
  @media (min-width: 1780px) {
    width: 460px;
  }

  position: relative;
`;

const TopLine = styled.div`
  padding: 3px 0 3px 60px;
  border-bottom: 2px solid #4a3820;
  background: rgb(1, 10, 19);
  min-width: 330px;
  clip-path: polygon(0 0, 100% 0%, 86% 100%, 0% 100%);
  display: flex;
  align-items: center;

  @media (min-width: 1780px) {
    padding: 6px 0 6px 70px;
  }
  & span {
    margin-left: 5px;
    color: #c7b184;
    font-family: "LoL Display";
    font-weight: 600;
    @media (min-width: 1780px) {
      font-size: 18px;
    }
  }
`;

const SmallProfilePicture = styled.img`
  @media (min-width: 1780px) {
    width: 40px;
  }
  width: 36px;
  height: auto;
  border-radius: 50%;
  border: 2px solid gold;
`;

const BannerBase = styled.img`
  position: absolute;
width: 429px;
  height: auto;
  left: -30px;
  top: -270px;
  @media (min-width: 1780px) {
    width: 482px;
  top: -236px;
  }
`;
const TrimBase = styled.img`
  position: absolute;
  width: 280px;
  height: auto;
  left: 62px;
  top: 544px;
  @media (min-width: 1780px) {
    width: 340px;
    top: 715px;
  }
`;
const BannerContent = styled.div`
  position: absolute;
  left: 45px;
  top: 147px;
  width: 280px;
  text-align: center;
  @media (min-width: 1780px) {
    top: 170px;
    width: 280px;
    left: 65px;
  }
  & p {
    @media (min-width: 1780px) {
      font-size: 36px;
      margin-bottom: 59px;
    }
    margin: 0;
    margin-bottom: 40px;
    color: #fff;
    font-family: "LoL Display";
    font-weight: 700;
    font-size: 30px;
  }
`;
const BigProfilePicture = styled.img`
  width: 113px;
  height: auto;
  border-radius: 50%;
  margin-top: 72px;
  @media (min-width: 1780px) {
  width: 113px;
    margin-top: 72px;
   width: 137px;
  }
`;

const LevelBorderImage = styled.img`
width: 283px;
  height: auto;
  position: absolute;
  top: -5px;
  left: -1px;
@media (min-width: 1780px) {

    width: 320px;
    top: -12px;

  left: -18px;

}
`;
const LevelContainer = styled.div`
  top: -25px;
  left: 118px;
  text-align: center;
  width: 45px;
  height: 25px;
  position: absolute;

  & img {
    position: absolute;
    top: 0;
    left: 0;
  }
  & div {
    position: absolute;
    top: 3px;
    left: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid #0a96aa;
  }
  & span {
    color: #7c7a70;
    font-size: 16px;
    left: 25%;
    font-family: "LoL Display";
    font-weight: 700;
    position: absolute;
    text-align: center;
    width: 100%;
    display: inline-block;
  }

  @media (min-width: 1780px) {
    top: -25px;
    left: 118px;
    width: 45px;
    height: 25px;
 & div {
  top: 5px;
  left: -8px;
  width: 14px;
  height: 13px;
  border: 3.5px solid #0a96aa;
  }
  & img {
  left: -15px;
  width: 176%;
  }
    & span {
      font-size: 24px;
    }
  }
`;

const ProfileNameBig = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  width: 100%;
  top: 240px;

  & > div > div {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover > div > div {
    display: flex;
    opacity: 1;
  }
  &:hover {
    cursor: pointer;
  }
  &:hover > p {
    color: #cabc90;
  }
  & p {
    margin: 0;
    color: #f0e6d2;
    font-size: 24px;
  @media (min-width: 1780px) {
  font-size: 30px;
  }
  }
  .copy-img {
  width: 20px;
  height: 20px;
    @media (min-width: 1780px) {
    width: 28px;
  height: 28px;
  }
  }
`;

const Title = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  top: 279px;
  margin: 0;
  color: #949083;
  font-size: 18px;
  text-align: center;
  @media (min-width: 1780px) {
    font-size: 22px;
  top: 285px;
  }
`;

const NameHoverWrapper = styled.div`
  position: absolute;
  top: 125%;
  left: 50%;
  transform: translate(-50%, 0);

  z-index: 25;

  justify-content: center;
  align-items: center;
  background: #735c32;
  & > div {
    padding: 10px;
    margin: 2px;
    background: #1b1c21;
    & > p {
      font-size: 18px;
      white-space: nowrap;
      color: #989687;
    }
  }
`;
const NameHover = ({ name, tag, wasCopied }) => {
  return (
    <NameHoverWrapper>
      <div>
        <p>
          {name} #{tag}
        </p>
        {wasCopied ? (
          <>
            <div
              style={{
                height: "2px",
                width: "100%",
                background: "#a09b8c",
                margin: "4px 0",
              }}
            />
            <p style={{ color: "#ccbd90", margin: "4px 0", fontSize: "16px" }}>
              Copied to clipboard
            </p>
          </>
        ) : null}
      </div>
    </NameHoverWrapper>
  );
};

const Banner = ({ simple }) => {
  const user = useSelector((state) => state.data.profile);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const tm = setTimeout(() => {
        setCopied(false);
      }, 4000);
      return () => clearTimeout(tm);
    }
  }, [copied]);
  const patch = useSelector((state) => state.data.leagueData.version);
  if (!user.loaded) return null;
  const banner =
    user.challenges.preferences.bannerAccent !== "" &&
    Number.parseInt(user.challenges.preferences.bannerAccent) !== Number.NaN &&
    Number.parseInt(user.challenges.preferences.bannerAccent) >= 3 &&
    Number.parseInt(user.challenges.preferences.bannerAccent) <= 24
      ? require(
          `../../assets/img/banners/custom_${user.challenges.preferences.bannerAccent}.png`,
        )
      : BannerBaseImage;
  return (
    <Wrapper>
      {!simple && <BannerBase src={banner} />}
      {/*{!simple && <TrimBase src={DefaultTrimImage} />}*/}
      <TopLine>
        <SmallProfilePicture
          src={getProfilePictureUrl(patch, user.user.profileIconId)}
        />
        <span>{user.user.name}</span>
      </TopLine>

      {!simple ? (
        <BannerContent>
          <LevelContainer>
            <img src={require("../../assets/img/xp-radial-bg.png")} />
            <span>{user.user.summonerLevel}</span>
            <div />
          </LevelContainer>

          <BigProfilePicture
            src={getProfilePictureUrl(patch, user.user.profileIconId)}
          />
          <LevelBorderImage
            src={require(
              `./../../assets/img/level-border/theme-${getFileForBorder(
                user.challenges.preferences.prestigeCrestBorderLevel,
              )}-border.png`,
            )}
          />
          <ProfileNameBig
            onClick={() => {
              window.navigator.clipboard.writeText(
                `${user.user.name}#${user.user.tag}`,
              );
              setCopied(true);
            }}
          >
            <p>{user.user.name}</p>
            <div>
              <img
                src={require("../../assets/img/game-id-clipboard-copy.svg")}
                className={"copy-img"}
              />
              <NameHover
                wasCopied={copied}
                name={user.user.name}
                tag={user.user.tag}
              />
            </div>
          </ProfileNameBig>
          <Title>
            <span>
              {user.challenges.preferences.title_name
                ? user.challenges.preferences.title_name
                : "null"}
            </span>
          </Title>
          <Challenges data={user.challenges} />
        </BannerContent>
      ) : null}
    </Wrapper>
  );
};
export default Banner;
