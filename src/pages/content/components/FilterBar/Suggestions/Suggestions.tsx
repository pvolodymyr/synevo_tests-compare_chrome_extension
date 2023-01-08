import { SyntheticEvent } from "react";

import * as SC from "./Suggestions.styled";

type Suggestion = { value: string; isSelected: boolean };

interface Suggestions {
  suggestions: Suggestion[];
  onClick: (event: SyntheticEvent<HTMLDivElement>) => void;
}

const Suggestions = ({ suggestions = [], onClick }: Suggestions) => (
  <SC.Suggestions onClick={onClick}>
    {suggestions.map(({ value, isSelected }) => (
      <SC.Suggestion key={value} data-filter={value} isSelected={isSelected}>
        {value}
      </SC.Suggestion>
    ))}
  </SC.Suggestions>
);

export default Suggestions;
