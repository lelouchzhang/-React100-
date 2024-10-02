import React, { useEffect } from "react";

export default function Timer({ dispatch, countDown }) {
  const convert = `${Math.floor(countDown / 60)}:${countDown % 60}`;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "toki" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return <div className="timer">{convert}</div>;
}
