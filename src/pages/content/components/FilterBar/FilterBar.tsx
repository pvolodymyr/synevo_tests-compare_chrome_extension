import { SyntheticEvent, useState, useRef } from "react";

import useCloseSuggestionsOnClickOutside from "./hooks/useCloseSuggestionsOnClickOutside";
import useHandleTableRowsVisibility from "./hooks/useHandleTableRowsVisibility";
import useSelectedFilters from "./hooks/useSelectedFilters";
import useSuggestions from "./hooks/useSuggestions";
import useFilterData from "./hooks/useFilterData";

import SelectedFilters from "./SelectedFilters/SelectedFilters";
import Input from "./Input/Input";
import Suggestions from "./Suggestions/Suggestions";

import * as SC from "./FilterBar.styled";

const FilterBar = () => {
  const [filterValue, setFilterValue] = useState("");
  const inputRef = useRef(null);
  const { unicTestsList, testPackages } = useFilterData();
  const { selectedFilters, removeFilter, toggleFilter } = useSelectedFilters();
  const {
    suggestions,
    showSuggestions,
    hideSuggestions,
    hideSuggestionsOnEscapePressed,
    areSuggestionsVisible,
  } = useSuggestions({ inputRef, filterValue, selectedFilters, unicTestsList });

  const handleSetFilterValue = (event: SyntheticEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setFilterValue((event.target as HTMLInputElement).value ?? "");
  };

  useHandleTableRowsVisibility({ selectedFilters, testPackages });
  useCloseSuggestionsOnClickOutside(hideSuggestions);

  return (
    <SC.Filter>
      <SelectedFilters
        selectedFilters={selectedFilters}
        removeFilter={removeFilter}
      />
      <Input
        ref={inputRef}
        value={filterValue}
        onChange={handleSetFilterValue}
        onFocus={showSuggestions}
        onKeyUp={hideSuggestionsOnEscapePressed}
      />
      {areSuggestionsVisible && (
        <Suggestions suggestions={suggestions} onClick={toggleFilter} />
      )}
    </SC.Filter>
  );
};

export default FilterBar;
