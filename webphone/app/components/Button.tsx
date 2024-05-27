import React from "react";

interface ButtonProps {
  icon?: React.ReactNode;
  text?: string;
  tooltip?: string;
  size?: string;
}

const Button = ({ icon, text, tooltip, size }: ButtonProps) => {
  return (
    <div className="button group">
      {icon}
      {text}
      <span className="tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default Button;
