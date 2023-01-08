import { useEffect } from "react";
import { useSetAtom } from "jotai";

import {
  findInfoCell,
  findPriceCell,
  findTableRow,
} from "@src/utils/dom_manipulations";

import { parseInfoCellContent } from "@src/utils/parse";

import { removeButtonsAtom, selectdTestsAtom } from "@src/store/atoms";

const tableId = "all_tests_table";
const removeButtonClassName = "remove-button";
const targetRowSelectedClassName = "row-selected";

const createAndAppendRemoveButton = (
  targetRow: HTMLTableRowElement,
  handleRemove: () => void
) => {
  const button = document.createElement("button");

  button.className = removeButtonClassName;
  button.innerText = "remove";

  targetRow.classList.add(targetRowSelectedClassName);

  const listener = (event: Event) => {
    event.stopPropagation();

    removeButton();
  };

  const removeButton = () => {
    targetRow.classList.remove(targetRowSelectedClassName);

    handleRemove();

    button.removeEventListener("click", listener);
    button.remove();
  };

  button.addEventListener("click", listener);

  targetRow.append(button);

  return removeButton;
};

const useTableClick = () => {
  const setSelectedTests = useSetAtom(selectdTestsAtom);
  const setRemoveButtons = useSetAtom(removeButtonsAtom);

  const handleRemove = (removeId: string) => () => {
    setSelectedTests((tests) => {
      const result = [...tests];
      const index = result.findIndex(({ id }) => id === removeId);

      if (index !== -1) {
        result.splice(index, 1);
      }

      return result;
    });

    setRemoveButtons((removeButtons) => {
      const removeButtonsCopy = { ...removeButtons };

      delete removeButtonsCopy[removeId];

      return removeButtonsCopy;
    });
  };

  const handleClick: EventListener = (event) => {
    const tableRowNode = findTableRow(event);

    if (tableRowNode) {
      const data = parseInfoCellContent(
        findInfoCell(tableRowNode),
        findPriceCell(tableRowNode)
      );

      let isAlreadyAdded = false;

      setSelectedTests((tests) => {
        const index = tests.findIndex(({ id }) => id === data.id);

        if (index === -1) {
          return [...tests, data];
        } else {
          isAlreadyAdded = true;
          return tests;
        }
      });

      if (
        !isAlreadyAdded &&
        !tableRowNode.querySelector(`button.${removeButtonClassName}`)
      ) {
        const removeButtonFromDOM = createAndAppendRemoveButton(
          tableRowNode,
          handleRemove(data.id)
        );

        if (removeButtonFromDOM) {
          setRemoveButtons((removeButtons) => ({
            ...removeButtons,
            [data.id]: removeButtonFromDOM,
          }));
        }
      }
    }
  };

  useEffect(() => {
    const table = document.getElementById(tableId);

    table.addEventListener("click", handleClick);

    return () => table.removeEventListener("click", handleClick);
  }, []);
};

export default useTableClick;
