import * as SC from "./SelectedFilters.styled";

interface SelectedFiltersProps {
  selectedFilters: string[];
  removeFilter: (filter: string) => void;
}

const SelectedFilters = ({
  selectedFilters = [],
  removeFilter,
}: SelectedFiltersProps) => (
  <SC.SelectedFilters>
    {selectedFilters.map((value) => (
      <SC.Filter key={value}>
        {value}
        <SC.CloseButton onClick={() => removeFilter(value)} />
      </SC.Filter>
    ))}
  </SC.SelectedFilters>
);

export default SelectedFilters;
