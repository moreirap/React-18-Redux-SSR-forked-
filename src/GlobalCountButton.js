import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCount, increaseCount } from "./redux";

function useIsHydrated() {
  // Get weird Babel-errors when I try to destruct arrays..
  const hydratedState = useState(false);
  const hydrated = hydratedState[0];
  const setHydrated = hydratedState[1];

  // When this effect runs and the component being hydrated isn't
  // exactly the same thing but close enough for this demo.
  useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  return hydrated;
}

export default function GlobalCountButton() {
  const isHydrated = useIsHydrated();
  const count = useSelector(getCount);
  const dispatch = useDispatch();

  return (
    <button
      disabled={!isHydrated}
      style={{ marginLeft: "24px" }}
      onClick={() => dispatch(increaseCount())}
    >
      {isHydrated
        ? `Hydrated. Count: ${count}`
        : `Not hydrated. Count: ${count}`}
    </button>
  );
}
