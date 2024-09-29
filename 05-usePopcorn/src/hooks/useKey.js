import { useEffect } from "react";

export const useKey = (key, action) => {
  // escape键 退出movieDetails
  useEffect(() => {
    const cb = (e) => {
      if (e.code === key) action();
    };
    document.addEventListener("keydown", cb);
    return function () {
      document.removeEventListener("keydown", cb);
    };
  }, [action, key]);

  return useKey;
};
