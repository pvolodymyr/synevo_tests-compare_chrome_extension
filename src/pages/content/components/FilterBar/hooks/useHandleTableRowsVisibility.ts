import { useEffect, useMemo, useState } from "react";

import useTableRows from "./useTableRows";

import {
  getUnincludedItems,
  getFilteredIds,
  includesEvery,
  hideNodes,
  showNodes,
} from "./utils";

type UseHandleTableRowsVisibilityProps = {
  selectedFilters: string[];
  testPackages: { id: string; tests: string[] }[];
};

const useHandleTableRowsVisibility = ({
  selectedFilters,
  testPackages,
}: UseHandleTableRowsVisibilityProps) => {
  const [previouslyVisiblePackagesIds, setPreviouslyVisiblePackagesIds] =
    useState<string[]>([]);
  const [allPackagesAreHidden, setAllPackagesAreHidden] = useState(false);
  const tableRows = useTableRows();

  const currentlyVisiblePackagesIds = useMemo(() => {
    const result = [];

    if (
      !selectedFilters ||
      selectedFilters.length === 0 ||
      !tableRows ||
      !testPackages ||
      testPackages.length === 0
    )
      return result;

    for (const { id, tests } of testPackages) {
      if (includesEvery(tests, selectedFilters)) {
        result.push(id);
      }
    }

    return result;
  }, [selectedFilters, tableRows, testPackages]);

  useEffect(() => {
    if (!tableRows || !testPackages || testPackages.length === 0) return;

    if (selectedFilters.length > 0) {
      if (currentlyVisiblePackagesIds.length > 0) {
        if (previouslyVisiblePackagesIds.length > 0) {
          console.log("CASE 1");
          // hide previously visible, currently not included, items
          const previouslyVisibleItems = getUnincludedItems(
            currentlyVisiblePackagesIds,
            previouslyVisiblePackagesIds
          );
          hideNodes(previouslyVisibleItems, tableRows);

          // show previously hidden, currently included, items
          const previouslyHiddenItems = getUnincludedItems(
            previouslyVisiblePackagesIds,
            currentlyVisiblePackagesIds
          );
          showNodes(previouslyHiddenItems, tableRows);
        } else {
          console.log("CASE 2");
          // hide all not included items
          if (allPackagesAreHidden) {
            showNodes(currentlyVisiblePackagesIds, tableRows);

            setAllPackagesAreHidden(false);
          } else {
            const filteredIds = getFilteredIds(
              currentlyVisiblePackagesIds,
              tableRows
            );

            hideNodes(filteredIds, tableRows);
          }
        }
      } else {
        console.log("CASE 3");
        // hide all and show "nothing founded" message
        if (allPackagesAreHidden) return;

        const allRowsIds = Array.from(tableRows.keys());

        hideNodes(allRowsIds, tableRows);

        setAllPackagesAreHidden(true);
      }
    } else {
      if (previouslyVisiblePackagesIds.length > 0) {
        console.log("CASE 4");
        // show previously hidden, currently included, items
        const filteredIds = getFilteredIds(
          previouslyVisiblePackagesIds,
          tableRows
        );

        showNodes(filteredIds, tableRows);
      }
    }

    setPreviouslyVisiblePackagesIds(currentlyVisiblePackagesIds);
  }, [currentlyVisiblePackagesIds, selectedFilters, tableRows, testPackages]);
};

export default useHandleTableRowsVisibility;
