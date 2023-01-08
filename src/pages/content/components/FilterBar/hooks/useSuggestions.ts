import {
  MutableRefObject,
  SyntheticEvent,
  KeyboardEvent,
  useState,
  useMemo,
} from "react";

type UseSuggestionsProps = {
  selectedFilters: string[];
  unicTestsList: string[];
  filterValue: string;
  inputRef: MutableRefObject<HTMLInputElement>;
};
const useSuggestions = ({
  selectedFilters,
  unicTestsList,
  filterValue,
  inputRef,
}: UseSuggestionsProps) => {
  const [areSuggestionsVisible, setSuggestionsVisibility] = useState(false);

  const showSuggestions = (event: SyntheticEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setSuggestionsVisibility(true);
  };

  const hideSuggestions = () => {
    setSuggestionsVisibility(false);
  };

  const hideSuggestionsOnEscapePressed = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();

    if (event.key === "Escape") {
      hideSuggestions();
      inputRef.current?.blur();
    }
  };

  const suggestions = useMemo(
    () =>
      unicTestsList
        .filter((value: string) =>
          value.toLowerCase().includes(filterValue.toLowerCase())
        )
        .map((value) => ({
          value,
          isSelected: selectedFilters.includes(value),
        })),
    [unicTestsList, filterValue]
  );

  return {
    suggestions,
    showSuggestions,
    hideSuggestions,
    hideSuggestionsOnEscapePressed,
    areSuggestionsVisible,
  };
};
export default useSuggestions;
