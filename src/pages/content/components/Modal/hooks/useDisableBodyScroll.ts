import { useEffect } from "react";

const useDisableBodyScroll = () => {
  useEffect(() => {
    const overflowStyle = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowStyle;
    };
  }, []);
};

export default useDisableBodyScroll;
