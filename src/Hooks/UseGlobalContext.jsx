import { useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";

export const UseGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      `UseGlobalContext() must be in the GlobalContextProvider()!!!`,
    );
  }
  return context;
};