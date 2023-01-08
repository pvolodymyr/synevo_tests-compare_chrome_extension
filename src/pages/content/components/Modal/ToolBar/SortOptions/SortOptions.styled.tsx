import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 6px 20px;

  h3 {
    margin-bottom: 8px;
  }
`;

export const SortOption = styled.label<{ isSelected: boolean }>`
  display: flex;
  padding: 7px 8px;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;

  ${({ isSelected }) =>
    isSelected
      ? css`
          border-color: #fcb814;
        `
      : ""}

  input {
    display: none;
  }
`;

export const SortOptions = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  label + label {
    margin-left: 10px;
  }
`;
