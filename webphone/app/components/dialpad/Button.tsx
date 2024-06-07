import React from "react";
import { FaPhone } from "react-icons/fa6";

export enum ButtonType {
  default,
  positive,
  negative,
  neutral,
}

const typeStyles: { [key: number]: string } = {
  0: "bg-slate-200 dark:bg-slate-900 dark:text-slate-400",
  1: "bg-lime-400 text-white",
  2: "bg-red-600 text-white",
  3: "bg-sky-400 text-white",
};

enum ButtonIcons {
  phone,
  ringing,
  answered,
}

interface ButtonProps {
  label: string;
  icon: string;
  type: ButtonType,
  clickHandler: any
}

const Button = ({ label, icon, type, clickHandler }: ButtonProps) => {
  let content = icon ? <FaPhone /> : label;
  return (
    <button
      className={`${typeStyles[type]} flex size-10 items-center justify-center rounded-md p-2 font-bold shadow-sm brightness-100 hover:brightness-90 hover:shadow-lg`}
      title={label}
      onClick={clickHandler}
    >
      {content}
    </button>
  );
};

export default Button;
