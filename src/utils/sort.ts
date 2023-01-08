import { Row, RowTypes } from "@src/store/types";

export const sortStrings = (prev: string, next: string) => {
  const firstItem = prev.toLowerCase();
  const secondItem = next.toLowerCase();

  return firstItem < secondItem ? -1 : firstItem > secondItem ? 1 : 0;
};

export const sortRowsCommonFirst = (a: Row, b: Row) =>
  (a.rowType === RowTypes.Common && b.rowType === RowTypes.Common) ||
  (a.rowType !== RowTypes.Common && b.rowType !== RowTypes.Common)
    ? sortStrings(a.id, b.id)
    : a.rowType !== RowTypes.Common && b.rowType === RowTypes.Common
    ? 1
    : -1;

export const sortRowsAlphabetically = (a: Row, b: Row) =>
  sortStrings(a.id, b.id);
