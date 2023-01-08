import styled from "styled-components";
import { Marings } from "./TestsBoard";

export const TestBoard = styled.div`
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  word-break: break-word;
`;

export const Row = styled.div<{ margins?: Marings }>`
  display: flex;
  margin: ${({ margins }) =>
    `${margins?.marginTop ?? 0} 0 ${margins?.marginBottom ?? 0}`};
`;

export const Cell = styled.div<{ colorValue: string; width: string }>`
  background-color: ${({ colorValue }) => colorValue};
  width: ${({ width }) => width};
  flex-grow: 1;
  padding: 8px 10px;
  min-width: 200px;
  max-width: 600px;
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  color: #333;

  ${Cell} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #bbd9ea;
    border-bottom: 2px solid #f4f4f4;

    h4 {
      font-weight: 500;
      line-height: 1.2;

      span {
        font-weight: 600;
      }
    }
  }
`;

export const RemoveButton = styled.button`
  font-weight: 600;
  background-color: #fcba22;
  margin-top: auto;
  padding: 6px 10px 8px 10px;
  border-radius: 4px;
  color: #333;
  margin-top: 10px;
`;
