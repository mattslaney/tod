import React, { useContext, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks/useRedux";
import { updatePhone, phonePassword, phoneServer, phoneUsername, updatePhoneStatus } from "@/app/slices/phoneSlice";
import { PhoneContext } from "@/app/contexts/Phones";

const PhoneSettings = () => {
  const phoneContext = useContext(PhoneContext);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState(useAppSelector(phoneUsername));
  const [password, setPassword] = useState(useAppSelector(phonePassword));
  const [server, setServer] = useState(useAppSelector(phoneServer));

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch(updatePhone({username, password, server}));
    phoneContext?.updatePhone(0, {username, password, server});
  };

  const handleRegister = async () => {
    const phone = phoneContext?.getPhone(0);
    await phone?.register();
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
          onBlur={handleChange}
          className="w-2/3 rounded border px-2 py-1"
        />
      </label>
      <label className="mb-4 flex items-center">
        <span className="w-1/3">Password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleChange}
          className="w-2/3 rounded border px-2 py-1"
        />
      </label>
      <label className="flex items-center">
        <span className="w-1/3">Server:</span>
        <input
          type="text"
          value={server}
          onChange={(e) => setServer(e.target.value)}
          onBlur={handleChange}
          className="w-2/3 rounded border px-2 py-1"
        />
      </label>
      <button onClick={handleRegister} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Register Phone</button>
    </div>
  );
};

export default PhoneSettings;
