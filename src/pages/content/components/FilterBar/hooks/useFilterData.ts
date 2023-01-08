import { useEffect, useState } from "react";

import { getAllUnicTests } from "@src/pages/content/hooks/utils";
import { getTableRowsData } from "./utils";

const useFilterData = () => {
  const [testPackages, setTestPackages] = useState([]);
  const [unicTestsList, setUnicTestsList] = useState([]);

  useEffect(() => {
    const packages = getTableRowsData();

    if (packages.length > 0) {
      setTestPackages(packages);
      setUnicTestsList(getAllUnicTests(packages));
    }
  }, []);

  return {
    testPackages,
    unicTestsList,
  };
};

export default useFilterData;
