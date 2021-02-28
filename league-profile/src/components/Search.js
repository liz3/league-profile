import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import {withRouter} from 'react-router-dom'

const KeyHostMap = {
  br: "Brazil",
  eune: "Europe Nordic & East",
  euw: "Europe West",
  jp: "Japan",
  kr: "Korea",
  "la-one": "Latin America North",
  "la-two": "Latin America South",
  na: "North America",
  oc: "Oceania",
  tr: "Turkey",
  ru: "Russia",
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const DropdownContainer = styled.div`
  background: rgb(70, 55, 20);
  min-width: 150px;
  & > div {
    padding: 1px;
    overflow-y: auto;
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
    max-height: 400px;
    & > div {
      padding: ${props => props.top? '5px 10px 5px 10px' : '12px 10px 12px 10px'};
      background: #0a0a0a;
      :hover {
        background: #2a2a2a;
        cursor: pointer;
      }
      & span {
        color: rgb(240, 230, 210);

        display: block;
 
        font-weight: 300;
        font-size: 18px;
      }
    }
  }
`;
const InputWrapper = styled.div`
  margin-left: 15px;
  background: linear-gradient(5deg, rgba(108,81,36,1) 0%, rgba(77,60,23,1) 100%);

& > div {
    padding:1px;
    & > input {
        background: #0a0a0a;
        padding: 10px;
        color: rgb(240, 230, 210);
        font-size: 16px;
        border-style: none;
        outline: none;
      }
}
`;

const Search = ({history}) => {
  const [region, setRegion] = useState("euw");
  const [name, setName] = useState("");
  return (
    <Wrapper>
      <Dropdown
        element={
          <DropdownContainer top>
            <div>
              <div>
                <span>Region: {KeyHostMap[region]}</span>
              </div>
            </div>
          </DropdownContainer>
        }
        container={
          <DropdownContainer>
            <div>
              {Object.keys(KeyHostMap).map((val) => (
                <div onClick={() => setRegion(val)} key={val}>
                  <span>{KeyHostMap[val]}</span>
                </div>
              ))}
            </div>
          </DropdownContainer>
        }
      />
      <InputWrapper>
      <div>
      <input
          value={name}
          onChange={(ev) => {
            setName(ev.target.value);
          }}
          onKeyDown={ev => {
            if (
                ev.keyCode === 13 &&
                !ev.shiftKey &&
                !ev.metaKey &&
                !ev.ctrlKey
              ) {
    
                ev.preventDefault();
            
                history.push(`/profile/${region}/${encodeURIComponent(name)}`)
              }
          }}
          placeholder={"Summoner Search"}
        />
      </div>
      </InputWrapper>
    </Wrapper>
  );
};
export default withRouter(Search);
