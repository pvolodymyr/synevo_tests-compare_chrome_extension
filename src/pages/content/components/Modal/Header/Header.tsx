import { useAtomValue, useSetAtom } from "jotai";
import { isModalOpenedAtom, selectdTestsAtom } from "@src/store/atoms";

import * as SC from "./Header.styled";

const Header = () => {
  const selectedTests = useAtomValue(selectdTestsAtom);
  const setIsModalOpened = useSetAtom(isModalOpenedAtom);

  return (
    <SC.Header>
      <h3>You have selected {selectedTests.length} medical tests to compare</h3>
      <button onClick={() => setIsModalOpened(false)}>close board</button>
    </SC.Header>
  );
};

export default Header;
