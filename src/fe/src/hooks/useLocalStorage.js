"use client";

import { useState, useEffect, useMemo } from "react";

const useLocalStorage = (key, initial) => {
  const [currentLocalStorage, setCurrentLocalStorage] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let val = localStorage.getItem(key);

      if (val === null) {
        setLocalStorage(initial ?? "");
      } else {
        let parsedVal = JSON.parse(val);
        setCurrentLocalStorage(parsedVal);
      }
    }
  }, [key]);

  const setLocalStorage = (item) => {
    setCurrentLocalStorage(item);
    let val = JSON.stringify(item);
    localStorage.setItem(key, val);
  };
  return [currentLocalStorage, setLocalStorage];
};

export default useLocalStorage;
