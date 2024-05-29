import { usePhoneSettings } from "@/app/contexts/PhoneSettings";
import React from "react";

const PhoneSettings = () => {
  const { phoneSettings, updatePhoneSettings } = usePhoneSettings();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePhoneSettings({ ...phoneSettings, username: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePhoneSettings({ ...phoneSettings, password: e.target.value });
  };

  const handleServerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePhoneSettings({ ...phoneSettings, server: e.target.value });
  };
  return (
    <div className="flex flex-col p-10">
      <h1 className="text-xl font-bold mb-4">Phone Settings</h1>
      <label className="flex items-center mb-4">
        <span className="w-1/3">Username:</span>
        <input
          type="text"
          value={phoneSettings.username}
          onChange={handleUsernameChange}
          className="w-2/3 px-2 py-1 border rounded"
        />
      </label>
      <label className="flex items-center mb-4">
        <span className="w-1/3">Password:</span>
        <input
          type="password"
          value={phoneSettings.password}
          onChange={handlePasswordChange}
          className="w-2/3 px-2 py-1 border rounded"
        />
      </label>
      <label className="flex items-center">
        <span className="w-1/3">Server IP Address/Hostname:</span>
        <input
          type="text"
          value={phoneSettings.server}
          onChange={handleServerChange}
          className="w-2/3 px-2 py-1 border rounded"
        />
      </label>
    </div>
  );
};

export default PhoneSettings;
