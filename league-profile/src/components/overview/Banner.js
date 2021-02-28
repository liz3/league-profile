import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getProfilePictureUrl } from "../../common/utils";
import BannerBaseImage from "../../assets/img/banners/still.png";
import DefaultTrimImage from "../../assets/img/banners/trim_default.png";
import LevelBar from "./LevelBar";

const getFileForBorder = (level) => {
  if (level >= 500) return 21;
  if (level < 30) return 1;
  if (level < 50) return 2;
  const count = Math.floor(level / 25) + 1;
  return count;
};

const Wrapper = styled.div`
  width: 390px;
  @media (min-width: 1700px) {
    width: 460px;
  }

  position: relative;
`;

const TopLine = styled.div`
  padding: 3px 0 3px 60px;
  border-bottom: 2px solid #4a3820;
  background: rgb(1,10,19);
  min-width: 330px;
  clip-path: polygon(0 0, 100% 0%, 86% 100%, 0% 100%);
  display: flex;
  align-items: center;

  @media (min-width: 1700px) {
    padding: 6px 0 6px 70px;
  }
  & span {
    margin-left: 5px;
    color: #c7b184;
    font-family: "LoL Display";
    font-weight: 600;
    @media (min-width: 1700px) {
        font-size: 18px;

    }
  }
`;

const SmallProfilePicture = styled.img`
@media (min-width: 1700px) {
  width: 40px;

}
  width: 36px;
  height: auto;
  border-radius: 50%;
  border: 2px solid gold;
`;
const BigProfilePicture = styled.img`
  width: 143px;
  height: auto;
  border-radius: 50%;
  margin-top:72px;
  @media (min-width: 1700px) {
    width: 180px;
    margin-top:95px;

  }
`;

const BannerBase = styled.img`
  position: absolute;
  width: 280px;
  height: auto;
  left: 62px;
  top: -250px;
  @media (min-width: 1700px) {
    width: 340px;
  }
`;
const TrimBase = styled.img`
  position: absolute;
  width: 280px;
  height: auto;
  left: 62px;
  top: 544px;
  @media (min-width: 1700px) {
    width: 340px;
    top: 715px;
  }
`;
const BannerContent = styled.div`
  position: absolute;
  left: 62px;
  top: 87px;
  width: 280px;
  text-align: center;
  @media (min-width: 1700px) {
    width: 340px;
    top: 100px;
  }
  & p {
    @media (min-width: 1700px) {
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
const LevelBorderImage = styled.img`
width: 258px;
height: auto;
position: absolute;
top: 123px;
left: 11px;
@media (min-width: 1700px) {
  width: 310px;
  top: 170px;
}
}
`;
const LevelSpanBig = styled.div`
  top: 316px;
  left: 118px;
  text-align: center;
  width: 45px;
  height: 25px;
  position: absolute;

  & span {
    color: #fff;
    font-size: 20px;
    font-family: "LoL Display";
    font-weight: 700;
  }

  @media (min-width: 1700px) {
    width: 60px;
    height: 35px;
    top: 400px;
    left: 139px;
   & span {
    font-size: 24px;

   }
  }
`;



const Banner = ({simple}) => {
  const user = useSelector((state) => state.data.profile);
  const patch = useSelector((state) => state.data.leagueData.version);
  if (!user.loaded) return null;
  return (
    <Wrapper>
      {!simple && <BannerBase src={BannerBaseImage} />}
      {!simple && <TrimBase src={DefaultTrimImage} />}
      <TopLine>
        <SmallProfilePicture
          src={getProfilePictureUrl(patch, user.user.profileIconId)}
        />
        <span>{user.user.name}</span>
      </TopLine>
      {!simple ? <BannerContent>
        <p>{user.user.name}</p>
    
       <LevelBar level={user.user.summonerLevel} />
     
        <BigProfilePicture
          src={getProfilePictureUrl(patch, user.user.profileIconId)}
        />
        <LevelBorderImage
          src={
            require(`./../../assets/img/level-border/theme-${getFileForBorder(
              user.user.summonerLevel
            )}-solid-border.png`).default
          }
        />
        <LevelSpanBig>
          <span>{user.user.summonerLevel}</span>
        </LevelSpanBig>
      </BannerContent> : null}
    </Wrapper>
  );
};
export default Banner;
