import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  z-index: 400;
  min-width: 145px;
  background: linear-gradient(
    45deg,
    rgba(70, 55, 20, 1) 0%,
    rgba(120, 90, 40, 1) 100%
  );
  & > div {
      background: rgb(1, 10, 19);
    }
    padding: 2px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;
const Item = styled.div`
  padding: 10px 0 10px 15px;
  & > span {
    color: rgb(202, 187, 143);
  }
  :hover {
    cursor: pointer;
    background: rgb(30, 35, 40);
    & > span {
      color: rgb(240, 230, 210);
    }
  }
`;

const ContextMenu = ({ items = [], left, top, onTrigger }) => {
  return (
    <Wrapper top={top} left={left}>
      <div>
        {items.map((item, index) => (
          <Item key={index} onClick={() => onTrigger && onTrigger(item.key)}>
            <span>{item.name}</span>
          </Item>
        ))}
      </div>
    </Wrapper>
  );
};
export default ContextMenu;
