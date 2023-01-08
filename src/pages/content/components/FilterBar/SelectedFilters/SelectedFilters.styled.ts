import styled from "styled-components";

export const SelectedFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -2px;

  &:empty {
    display: none;
  }
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #fcb814;
  margin: 2px;
  color: #0053a0;
  font-weight: 600;
  border-radius: 4px;
`;

export const CloseButton = styled.button`
  position: relative;
  width: 24px;
  height: 24px;
  margin-left: 10px;
  background-color: transparent;
  border-radius: 3px;

  &:hover {
    background-color: rgb(255 255 255 / 44%);
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 3px;
    left: 11px;
    width: 2px;
    height: 18px;
    background-color: #333;
    rotate: 45deg;
  }

  &:after {
    rotate: -45deg;
  }
`;
