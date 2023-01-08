import { ReactNode, useRef, useMemo } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: PortalProps) => {
  const headerRef = useRef<Element>(document.querySelector(selector));

  const isSynevo = useMemo(
    () =>
      window.location.href.includes("https://www.synevo.ua") &&
      window.location.href.includes("tests/15"),
    [window.location.href]
  );

  if (isSynevo && headerRef.current) {
    return ReactDOM.createPortal(children, headerRef.current);
  }

  return null;
};

export default Portal;
