import { useState, useEffect } from "react";

export const useLocalStorageState = (initialState, key) => {
  // const [watched, setWatched] = useState([]);
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
};
