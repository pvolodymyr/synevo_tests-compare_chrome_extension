import { useEffect, useState } from "react";

import { TableRowsMap } from "@src/store/types";
import { getTableRows } from "./utils";
import { parseId } from "@src/utils/parse";
import { findInfoCell } from "@src/utils/dom_manipulations";

const useTableRows = () => {
  const [tableRows, setTableRows] = useState<TableRowsMap>(null);

  useEffect(() => {
    const resultMap = new Map();
    const tableRowsList = getTableRows();

    for (const tableRowNode of tableRowsList) {
      const packageId = parseId(findInfoCell(tableRowNode));

      resultMap.set(packageId, tableRowNode);
    }

    setTableRows(resultMap);
  }, []);

  return tableRows;
};

export default useTableRows;
