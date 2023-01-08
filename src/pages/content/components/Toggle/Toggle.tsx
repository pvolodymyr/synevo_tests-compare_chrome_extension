import { useAtomValue, useSetAtom } from "jotai";

import { selectdTestsAtom, isModalOpenedAtom } from "@src/store/atoms";

import * as SC from "./Toggle.styled";

const Toggle = () => {
  const setIsModalOpened = useSetAtom(isModalOpenedAtom);
  const selectedTests = useAtomValue(selectdTestsAtom);

  return (
    <SC.Toggle onClick={() => setIsModalOpened((isOpened) => !isOpened)}>
      Open Board ({selectedTests.length})
    </SC.Toggle>
  );
};

export default Toggle;
