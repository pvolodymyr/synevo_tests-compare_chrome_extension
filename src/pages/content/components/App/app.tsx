import Portal from "../Portal/portal";
import Modal from "../Modal/Modal";
import Toggle from "../Toggle/Toggle";
import FilterBar from "../FilterBar/FilterBar";

import useTableClick from "../../hooks/useTableClick";
import { useAtomValue } from "jotai";
import { isModalOpenedAtom, selectdTestsAtom } from "@src/store/atoms";

const App = () => {
  const isModalOpened = useAtomValue(isModalOpenedAtom);
  const selectedTests = useAtomValue(selectdTestsAtom);

  useTableClick();

  return (
    <div>
      <Portal selector="header.header">
        {!isModalOpened && selectedTests.length > 1 && <Toggle />}
      </Portal>
      <Portal selector=".content__wrapper > .container">
        <FilterBar />
      </Portal>

      {isModalOpened && <Modal />}
    </div>
  );
};

export default App;
