import { SyntheticEvent, KeyboardEvent, forwardRef, ForwardedRef } from "react";

import { filterInputPlaceholder } from "@src/constants";

import * as SC from "./Input.styled";

interface InputProps {
  value: string;
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
  onFocus: (event: SyntheticEvent<HTMLInputElement>) => void;
  onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const Input = (
  { value, onChange, onFocus, onKeyUp }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => (
  <SC.Input
    ref={ref}
    type="text"
    value={value}
    onChange={onChange}
    onClick={(event) => event.stopPropagation()}
    onFocus={onFocus}
    onKeyUp={onKeyUp}
    placeholder={filterInputPlaceholder}
  />
);

export default forwardRef(Input);
