"use client";

import React, { ReactNode } from "react";
import { IconType } from "react-icons";

const SidebarIcon = ({ icon, text, onClick }: { icon: ReactNode; text?: string, onClick?: any }) => {
  return (
    <div className="sidebar-icon group" onClick={onClick}>
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default SidebarIcon;
