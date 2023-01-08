import styled from "styled-components";

export const Filter = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const Input = styled.input`
  border: 1px solid red;
`;

export const Suggestions = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  border: 2px solid #fcb814;
  background-color: #fff;
  max-height: 300px;
  box-shadow: 0px 10px 12px -6px #8a8a8a;
  overflow: auto;
`;

export const Suggestion = styled.span<{ isSelected: boolean }>`
  padding: 8px 12px;
  cursor: pointer;

  background-color: ${({ isSelected }) =>
    isSelected ? "#fcb814" : "transparent"};

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? "#fff" : "#fcb814")};
  }

  border: 2px solid;
  border-color: ${({ isSelected }) => (isSelected ? "#fcb814" : "#fff")};
`;
