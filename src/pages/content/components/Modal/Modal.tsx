import Header from "./Header/Header";
import ToolBar from "./ToolBar/ToolBar";
import TestsBoard from "../TestsBoard/TestsBoard";

import useDisableBodyScroll from "./hooks/useDisableBodyScroll";

import * as SC from "./Modal.styled";

const Modal = () => {
  useDisableBodyScroll();

  return (
    <SC.Modal>
      <Header />
      <ToolBar />
      <SC.Body>
        <TestsBoard />
      </SC.Body>
    </SC.Modal>
  );
};

export default Modal;
