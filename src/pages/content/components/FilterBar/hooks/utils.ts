import {
  packagesTableIdSelector,
  dataTableRowClassSelector,
} from "@src/constants";
import { TableRowsMap } from "@src/store/types";

import { getInfoCellTests } from "@src/utils/parse";

export const includesEvery = (target: string[], searchable: string[]) =>
  searchable.every((value) => target.includes(value));

export const getUnincludedItems = (
  target: string[] = [],
  source: string[] = []
) => {
  const result = [];

  if (target.length === 0) return [];
  if (source.length === 0) return target;

  for (const value of source) {
    if (!target.includes(value)) {
      result.push(value);
    }
  }

  return result;
};

export const getFilteredIds = (keysToDelete: string[], map: TableRowsMap) =>
  Array.from(map.keys()).filter((key) => !keysToDelete.includes(key));

const setElementsVisibility =
  (isVisible: boolean) =>
  (keys: string[] | Set<string>, nodesMap: TableRowsMap) => {
    for (const key of keys) {
      const htmlNode = nodesMap.get(key);

      if (htmlNode) {
        htmlNode.hidden = isVisible;
      }
    }
  };

export const hideNodes = setElementsVisibility(true);
export const showNodes = setElementsVisibility(false);

export const getTableRows = () =>
  Array.from(
    document.querySelectorAll(
      `${packagesTableIdSelector} ${dataTableRowClassSelector}`
    )
  ) as HTMLTableRowElement[];

export const getTableRowsData = () => getTableRows().map(getInfoCellTests);
