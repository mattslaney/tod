"use client";

import React, { ReactNode } from "react";
import { IconType } from "react-icons";

const SidebarIcon = ({ icon, text }: { icon: ReactNode; text?: string }) => {
  return (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default SidebarIcon;
