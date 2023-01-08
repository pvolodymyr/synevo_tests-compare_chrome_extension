import { SyntheticEvent } from "react";
import { useAtom } from "jotai";

import { selectedSortOptionAtom } from "@src/store/atoms";
import { SortOption } from "@src/store/types";

import IconSortDefault from "./icons/IconSortDefault";
import IconSortCommonFirst from "./icons/IconSortCommonFirst";

import * as SC from "./SortOptions.styled";

const SortOptions = () => {
  const [selectedOption, setSelectedOption] = useAtom(selectedSortOptionAtom);

  const onChangeValue = (event: SyntheticEvent<HTMLInputElement>) => {
    setSelectedOption((event.target as HTMLInputElement).value as SortOption);
  };

  const isDefaultSelected = selectedOption === SortOption.Default;
  const isCommonFirstSelected = selectedOption === SortOption.CommonFirst;

  return (
    <SC.Wrapper>
      <h3>Тип сортування:</h3>
      <SC.SortOptions onChange={onChangeValue}>
        <SC.SortOption isSelected={isDefaultSelected}>
          <IconSortDefault />
          <input
            type="radio"
            value={SortOption.Default}
            name="sort option"
            checked={isDefaultSelected}
          />
        </SC.SortOption>
        <SC.SortOption isSelected={isCommonFirstSelected}>
          <IconSortCommonFirst />
          <input
            type="radio"
            value={SortOption.CommonFirst}
            name="sort option"
            checked={isCommonFirstSelected}
          />
        </SC.SortOption>
      </SC.SortOptions>
    </SC.Wrapper>
  );
};

export default SortOptions;
