import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";



const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage("dark-theme");

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    enabled ? bodyClass.add(className) : bodyClass.remove(className);
  }, [enabled]);

  return [enabled, setEnabled];
};

export default useDarkMode;
