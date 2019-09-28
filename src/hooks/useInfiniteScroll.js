import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const useInfiniteScroll = callback => {
  const [isFetching, setIsFetching] = useState(true);

  const handleScrollDebounced = debounce(handleScroll, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollDebounced);
    return () => window.removeEventListener("scroll", handleScrollDebounced);
  });

  useEffect(() => {
    console.log("isFetching", isFetching);
    if (!isFetching) return;
    callback(() => {
      console.log("called back");
    });
  }, [isFetching]);

  function handleScroll() {
    console.log(window.innerHeight);
    console.log(document.documentElement.scrollTop);
    console.log(document.documentElement.offsetHeight);
    console.log(isFetching);
    if (
      window.innerHeight + document.documentElement.scrollTop <=
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }
  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
