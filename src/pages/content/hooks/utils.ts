import {
  SelectedTest,
  FilterItem,
  RowTypes,
  Cell,
  ParsedTestsBoardData,
  SortOption,
} from "@src/store/types";

import {
  sortRowsCommonFirst,
  sortRowsAlphabetically,
  sortStrings,
} from "@src/utils/sort";

const getIndexBasedHueValue = (index: number, limit: number) =>
  Math.round((360 / limit) * index);

const getColorValue = (limit: number, index: number) =>
  `hsl(${getIndexBasedHueValue(index, limit)}deg, 70%, 80%)`;

const getDuplicatedItems = (allProps: string[], commonProps: string[]) => {
  const allPropsSorted = [...allProps].sort(sortStrings);
  const result: string[] = [];

  if (allPropsSorted.length < 2) return result;

  const steps = allPropsSorted.length - 1;
  let index = 0;

  while (index < steps) {
    const currentProp = allPropsSorted[index];

    if (
      currentProp === allPropsSorted[index + 1] &&
      !result.includes(currentProp) &&
      !commonProps.includes(currentProp)
    ) {
      result.push(currentProp);
    }

    ++index;
  }

  return result;
};

const getCommonItems = (allTests: FilterItem[]) => {
  const allTestsCopy = allTests
    .map(({ id, tests }) => ({ id, tests: [...tests] })) // deep enough copy
    .sort((a, b) => a.tests.length - b.tests.length);

  const lesserArray = allTestsCopy[0];

  if (lesserArray.tests.length === 0) return null;

  let steps = lesserArray.tests.length;

  const commonProps: string[] = [];

  while (steps !== 0) {
    --steps;
    const propToSearch = lesserArray.tests[steps];

    const doesAllTestsIncludesItem = allTestsCopy.every(({ tests }) =>
      tests.includes(propToSearch)
    );

    if (doesAllTestsIncludesItem) {
      commonProps.push(propToSearch);

      // remove all duplicates
      for (const { tests } of allTestsCopy) {
        const propToSearchIndex = tests.findIndex(
          (prop) => prop === propToSearch
        );

        tests.splice(propToSearchIndex, 1);
      }
    }
  }

  commonProps.sort(sortStrings);

  return commonProps;
};

const getAllTestItems = (allTests: FilterItem[]) =>
  allTests
    .map(({ tests }) => tests)
    .flat()
    .sort(sortStrings);

const removeDuplicaitons = (items: string[]) => Array.from(new Set(items));

export const getAllUnicTests = (tests: FilterItem[]) =>
  removeDuplicaitons(getAllTestItems(tests));

const emptyField = {
  value: null,
  colorValue: "transparent",
};

const getCell = (
  value: string,
  rowType: RowTypes,
  duplicatedItems: string[]
) => {
  const colorValue =
    rowType === RowTypes.Common
      ? "yellow"
      : rowType === RowTypes.Duplicated
      ? getColorValue(duplicatedItems.length, duplicatedItems.indexOf(value))
      : "#fff";

  return {
    value,
    colorValue,
  };
};

export const sortTestsBoardData = (
  parsedTests: ParsedTestsBoardData["body"],
  sortOption: SortOption
) => {
  if (sortOption === SortOption.CommonFirst) {
    parsedTests.sort(sortRowsCommonFirst);
  } else {
    parsedTests.sort(sortRowsAlphabetically);
  }

  return parsedTests;
};

export const parseTestsBoardData = (
  tests: SelectedTest[],
  sortOption: SortOption
) => {
  const testsCopy = tests.map(({ tests, ...rest }) => ({
    tests: [...tests],
    ...rest,
  })); // deep enough copy

  testsCopy.forEach(({ tests }) => tests.sort(sortStrings));

  const commonItems = getCommonItems(testsCopy);

  const allItemsWithDuplications = getAllTestItems(testsCopy);
  const allItemsFiltered = removeDuplicaitons(allItemsWithDuplications);

  const duplicatedItems = getDuplicatedItems(
    allItemsWithDuplications,
    commonItems
  );
  const columnsQuantity = testsCopy.length;

  const rows = allItemsFiltered.map((testItem, rowIndex) => {
    const cells = [];
    const rowType = commonItems.includes(testItem)
      ? RowTypes.Common
      : duplicatedItems.includes(testItem)
      ? RowTypes.Duplicated
      : RowTypes.Unic;

    for (let columnIndex = 0; columnIndex < columnsQuantity; columnIndex++) {
      let cell: Cell = emptyField;

      const doesValueExist = !!testsCopy[columnIndex].tests[rowIndex];

      if (
        doesValueExist &&
        testsCopy[columnIndex].tests[rowIndex] === testItem
      ) {
        cell = getCell(
          testsCopy[columnIndex].tests[rowIndex],
          rowType,
          duplicatedItems
        );
      } else {
        testsCopy[columnIndex].tests.splice(rowIndex, 0, "");
      }

      cells.push(cell);
    }

    return { id: testItem, rowType, cells };
  });

  return {
    header: tests.map(({ id, price, headline }) => ({ id, price, headline })),
    body: sortTestsBoardData(rows, sortOption),
  };
};
