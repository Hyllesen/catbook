import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => {
      console.log(window.innerWidth);
      setWidth(window.innerWidth);
    };
    const handleResizeDebounced = debounce(handleResize, 500);
    window.addEventListener("resize", handleResizeDebounced);
    return () => {
      window.removeEventListener("resize", handleResizeDebounced);
    };
  }, []);

  return width;
}

export default useWindowWidth;
