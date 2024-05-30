import { usePhoneSettings } from "@/app/hooks/usePhoneSettings";
import React, { useEffect, useState } from "react";

const PhoneSettings = () => {
  const { phoneSettings, updatePhoneSettings } = usePhoneSettings();
  const [username, setUsername] = useState(phoneSettings.username);
  const [password, setPassword] = useState(phoneSettings.password);
  const [server, setServer] = useState(phoneSettings.server);

  const handleUsernameChange = (e: React.FocusEvent<HTMLInputElement>) => {
    updatePhoneSettings({ ...phoneSettings, username: e.target.value });
  };

  const handlePasswordChange = (e: React.FocusEvent<HTMLInputElement>) => {
    updatePhoneSettings({ ...phoneSettings, password: e.target.value });
  };

  const handleServerChange = (e: React.FocusEvent<HTMLInputElement>) => {
    updatePhoneSettings({ ...phoneSettings, server: e.target.value });
  };
  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-xl font-bold">Phone Settings</h1>
      <label className="mb-4 flex items-center">
        <span className="w-1/3">Username:</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleUsernameChange}
          className="w-2/3 rounded border px-2 py-1"
        />
      </label>
      <label className="mb-4 flex items-center">
        <span className="w-1/3">Password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordChange}
          className="w-2/3 rounded border px-2 py-1"
        />
      </label>
      <label className="flex items-center">
        <span className="w-1/3">Server:</span>
        <input
          type="text"
          value={server}
          onChange={(e) => setServer(e.target.value)}
          onBlur={handleServerChange}
          className="w-2/3 rounded border px-2 py-1"
        />
      </label>
    </div>
  );
};

export default PhoneSettings;
