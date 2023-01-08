import { useEffect } from "react";

const useCloseSuggestionsOnClickOutside = (hideSuggestions: () => void) => {
  useEffect(() => {
    document.addEventListener("click", hideSuggestions);
    () => document.removeEventListener("click", hideSuggestions);
  }, []);
};

export default useCloseSuggestionsOnClickOutside;
