import React, { useMemo } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  top: 320px;
  left: 40px;
  justify-content: center;
   @media (min-width: 1780px) {
  left: 20px;
   top: 370px;
  }
`;

const Empty = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #191a1d;
  border: 1px solid #2d2d2f;
  margin: 0 2px;
  @media (min-width: 1780px) {
  margin: 0 4px;
   width: 80px;
  height: 80px;
  }
`;

const Challenge = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 2px;
  @media (min-width: 1780px) {
  margin: 0 4px;
   width: 75px;
  height: 75px;
  }
  & > img {
    width: 100%;
    height: 100%;
  }
  & > div {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover > div {
    display: flex;
    opacity: 1;
  }
`;

const ChallengeInfoWrapper = styled.div`
  position: absolute;
  top: -300px;
  width: 440px;
  z-index: 25;
  height: 270px;
  justify-content: center;
  align-items: center;
  background: #735c32;
  & > div {
    width: 436px;
    height: 267px;
    background: #1b1c21;
    & > div {
      text-align: left;
      margin: 60px 40px;

      & .description {
        margin: 10px 0;
        font-size: 16px;
    @media (min-width: 1780px) {
    font-size: 20px;
  }
        color: #989687;
      }
    }
  }
`;

const EdgeImage = styled.img`
position: absolute;
left: 2px;
top: 2px;
  width: 70px;
  height: auto;

`

const InfoRow = styled.div`
  margin-left: 15px;
  & > p {
    margin: 0 !important;
    text-align: left;
  }
  & > p:nth-child(1) {
    text-transform: uppercase;
    font-size: 20px;
      @media (min-width: 1780px) {
    font-size: 24px;
  }
   
  }
  & > p:nth-child(2) {
    text-transform: uppercase;
    font-size: 16px;
      @media (min-width: 1780px) {
    font-size: 20px;
  }
   
    color: #989687;
  }
`;

const ProgressBase = styled.div`
  height: 32px;
  display: flex;
  position: relative;
  background: #1f282d;
  justify-content: center;
  align-items: center;
 
  & > span {
    color: white;
    font-size: 18px;
      @media (min-width: 1780px) {
    font-size: 22px;
  }
   
    position: relative;
    z-index: 5;
  }
`

const ProgressContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
   height: 100%;
  background: linear-gradient(90deg,rgba(12, 89, 119, 1) 0%, rgba(170, 215, 220, 1) 100%);
 transform-origin: left;
  transform: scaleX(${props => props.amount});
`

const Progress = ({current, next}) => {
  const amount = current / next;

  return <ProgressBase>
    <ProgressContainer amount={amount} />
    <span>{current} / {next}</span>
  </ProgressBase>
}

const ChallengePopup = ({ challenge, img }) => {
    console.log(challenge)
  const ss =  Object.entries(challenge.meta.threshold).sort((a,b) => a[1]-b[1]);
  const sorted = ss.find(e => e[1] > challenge.value);
  console.log(((ss.indexOf(sorted)-1) / ss.length) * 100)
  return (
    <ChallengeInfoWrapper>
      <EdgeImage src={require(`../../assets/img/challenges-edges/challenge-card-points-container-${challenge.level.toLowerCase()}.png`)} />
      <div>
        <div>
          <div style={{ display: "flex" }}>
            <img
              src={require(`../../assets/img/challenges/${img}`)}
              style={{ width: "64px", height: "64px" }}
            />
            <InfoRow>
              <p>{challenge.meta.description.name}</p>
              <p>{challenge.level}</p>
            </InfoRow>
          </div>
          <p className={"description"}>
            {challenge.meta.description.shortDescription||challenge.meta.description.description}
          </p>
          <Progress current={challenge.value} next={sorted ? sorted[1] : challenge.value} />
        </div>
      </div>
    </ChallengeInfoWrapper>
  );
};

const Challenges = ({ data }) => {
  const mapped = useMemo(() => {
    let m = [];
    for (let i = 0; i < 3; i++) {
      const entry = data.preferences.challengeIds[i];
      if (entry) {
        const d = data.challenges.find((e) => e.challengeId === entry);
        if (d) {
          m.push({ img: `${entry}-${d.level}.png`, challenge: d });
          continue;
        }
      }
      m.push(null);
    }
    return m;
  }, [data]);

  return (
    <Wrapper>
      {mapped.map((e, i) =>
        e ? (
          <Challenge key={i}>
            <img src={require(`../../assets/img/challenges/${e.img}`)} />
            <ChallengePopup img={e.img} challenge={e.challenge} />
          </Challenge>
        ) : (
          <Empty key={i} />
        ),
      )}
    </Wrapper>
  );
};
export default Challenges;
