import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesProvider";

export function useCities() {
  const ctx = useContext(CitiesContext);
  if (ctx === "undefined")
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  return ctx;
}
