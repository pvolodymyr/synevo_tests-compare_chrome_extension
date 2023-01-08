import { RowTypes } from "@src/store/types";
import useTestBoard from "../../hooks/useTestBoard";

import * as SC from "./TestsBoard.styled";

export type Marings = {
  marginTop: string;
  marginBottom: string;
};

const getRowMaringStyle = ({
  currentType,
  prevType,
  nextType,
}: {
  currentType: string;
  prevType: string;
  nextType: string;
}) => {
  const style: Marings = {
    marginTop: "5px",
    marginBottom: "5px",
  };

  if (currentType === RowTypes.Common) {
    if (prevType === RowTypes.Common) {
      style.marginTop = "0";
    }
    if (nextType === RowTypes.Common) {
      style.marginBottom = "0";
    }
  }

  return style;
};

const TestsBoard = () => {
  const { boardData, removeSelectedTest } = useTestBoard();

  return (
    <SC.TestBoard>
      <SC.Header>
        <SC.Row>
          {boardData.header.map(({ id, headline, price }) => (
            <SC.Cell
              key={id}
              colorValue={"transparent"}
              width={`${Math.round(100 / (boardData.header.length ?? 0))}%`}
            >
              <h4>
                {headline} - <span>{price}грн</span>
              </h4>

              <SC.RemoveButton onClick={removeSelectedTest(id)}>
                Видалити
              </SC.RemoveButton>
            </SC.Cell>
          ))}
        </SC.Row>
      </SC.Header>
      {boardData.body.map(({ cells, rowType }, rowIndex) => (
        <SC.Row
          key={`${rowIndex}`}
          margins={getRowMaringStyle({
            currentType: rowType,
            prevType: boardData.body[rowIndex - 1]?.rowType,
            nextType: boardData.body[rowIndex + 1]?.rowType,
          })}
        >
          {cells.map((cell, index) => (
            <SC.Cell
              key={`${cell.value}_${index}`}
              colorValue={cell.colorValue}
              width={`${Math.round(100 / (cells.length ?? 0))}%`}
            >
              {cell.value ?? ""}
            </SC.Cell>
          ))}
        </SC.Row>
      ))}
    </SC.TestBoard>
  );
};

export default TestsBoard;
