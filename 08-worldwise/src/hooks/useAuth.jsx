import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === "undefined")
    throw new Error("AuthContext was used outside of the AuthContextProvider");
  return ctx;
}
