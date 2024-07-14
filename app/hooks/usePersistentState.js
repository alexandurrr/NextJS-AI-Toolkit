import { useState, useEffect } from "react";

export function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const serializedState = JSON.stringify(state);
        window.localStorage.setItem(key, serializedState);
      } catch (error) {
        console.log(error);
      }
    }
  }, [key, state]);

  return [state, setState];
}
