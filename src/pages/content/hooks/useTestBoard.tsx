import { useEffect, useState, useCallback } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import {
  removeButtonsAtom,
  selectdTestsAtom,
  selectedSortOptionAtom,
} from "@src/store/atoms";
import { ParsedTestsBoardData } from "@src/store/types";
import { parseTestsBoardData } from "./utils";

const useTestBoard = () => {
  const [selectedTests, setSelectedTests] = useAtom(selectdTestsAtom);
  const sortOption = useAtomValue(selectedSortOptionAtom);
  const setRemoveButtons = useSetAtom(removeButtonsAtom);
  const [parsedTests, setParsedTests] = useState<ParsedTestsBoardData>({
    header: [],
    body: [],
  });

  const removeSelectedTest = useCallback(
    (testId: string) => () => {
      setSelectedTests(selectedTests.filter(({ id }) => id !== testId));
      setRemoveButtons((removeButtons) => {
        const removeButtonsCopy = { ...removeButtons };

        if (removeButtonsCopy[testId]) {
          removeButtonsCopy[testId]();

          delete removeButtonsCopy[testId];
        }

        return removeButtonsCopy;
      });
    },
    [selectedTests]
  );

  useEffect(() => {
    if (selectedTests.length > 1) {
      setParsedTests(parseTestsBoardData(selectedTests, sortOption));
    }
  }, [sortOption, selectedTests.length]);

  return { boardData: parsedTests, removeSelectedTest };
};

export default useTestBoard;
