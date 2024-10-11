import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext";

export function useCities() {
  const ctx = useContext(CitiesContext);
  if (ctx === "undefined")
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  return ctx;
}
