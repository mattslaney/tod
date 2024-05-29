import React from "react";
import SidebarIcon from "../controls/SidebarIcon";
import { MdContacts, MdDialpad, MdSettings, MdVoicemail } from "react-icons/md";
import PhoneSettings from "../settings/PhoneSettings";

interface SidebarProps {
  openModal: any
}

const Sidebar = ({openModal}: SidebarProps) => {
  return (
    <div
      className="flex w-16 flex-col 
        bg-slate-200 p-2 shadow-lg dark:bg-slate-900"
    >
      <SidebarIcon icon={<MdDialpad />} text="Keypad" />
      <SidebarIcon icon={<MdContacts />} text="Contacts" />
      <SidebarIcon icon={<MdVoicemail />} text="Voicemail" />
      <div className="flex-grow"></div>
      <SidebarIcon icon={<MdSettings />} text="Settings" onClick={() => openModal(<PhoneSettings/>)}/>
    </div>
  );
};

export default Sidebar;
