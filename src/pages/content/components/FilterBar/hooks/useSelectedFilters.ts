import { SyntheticEvent, useState } from "react";

const useSelectedFilters = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const removeFilter = (value: string) => {
    const index = selectedFilters.indexOf(value);

    if (index !== -1) {
      selectedFilters.splice(index, 1);
    }

    setSelectedFilters([...selectedFilters]);
  };

  const toggleFilter = (event: SyntheticEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const filterValue = (event.target as HTMLDivElement).getAttribute(
      "data-filter"
    );

    if (filterValue) {
      if (selectedFilters.includes(filterValue)) {
        removeFilter(filterValue);
      } else {
        setSelectedFilters([...selectedFilters, filterValue]);
      }
    }
  };

  return {
    selectedFilters,
    removeFilter,
    toggleFilter,
  };
};

export default useSelectedFilters;
