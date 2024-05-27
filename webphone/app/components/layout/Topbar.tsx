"use client";

import useDarkMode from "@/app/hooks/useDarkMode";
import { FaMoon, FaSun } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import Button from "../Button";

const Topbar = () => {
  return (
    <div className="flex h-8 justify-end bg-slate-800 text-white dark:bg-slate-950">
      <ThemeIcon />
    </div>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <>
      <span onClick={handleMode}>
        {darkTheme ? <Button icon={<FaSun />} /> : <Button icon={<FaMoon />} />}
      </span>
      <Button icon={<CgProfile />} size="2em" />
    </>
  );
};

export default Topbar;
