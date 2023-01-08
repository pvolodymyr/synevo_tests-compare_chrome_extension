import { atom } from "jotai";

import { SelectedTest, SortOption, CommonProps, DifferentProps } from "./types";

export const selectdTestsAtom = atom<SelectedTest[]>([]);
export const commonPropsAtom = atom<CommonProps>([]);
export const differentPropsAtom = atom<DifferentProps[]>([]);

export const removeButtonsAtom = atom<{ [key: string]: () => void }>({});

export const isModalOpenedAtom = atom<boolean>(false);
export const selectedSortOptionAtom = atom<SortOption>(SortOption.Default);
