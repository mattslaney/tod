import React, { useContext, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks/useRedux";
import { SimpleUserDelegate } from "sip.js/lib/platform/web";

import {
  updatePhone,
  phonePassword,
  phoneServer,
  phoneUsername
} from "@/app/slices/phoneSlice";
import { PhoneContext } from "@/app/contexts/Phones";
import { PhoneStatus, SimplePhone } from "@/app/utils/phoneUtils";

const PhoneSettings = () => {
  const phoneContext = useContext(PhoneContext);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState(useAppSelector(phoneUsername));
  const [password, setPassword] = useState(useAppSelector(phonePassword));
  const [server, setServer] = useState(useAppSelector(phoneServer));

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch(updatePhone({ username, password, server }));
    try {
      phoneContext?.updatePhone(0, { username, password, server });
    } catch (error) {
      console.error("Could not update phone");
    }
  };

  const handleRegister = async () => {
    const phone = phoneContext?.getPhone(0);
    try {
      await phone?.register();
    } catch (error) {
      console.error("Could not register phone");
    }
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
      <button
        onClick={handleRegister}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Register Phone
      </button>
    </div>
  );
};

export default PhoneSettings;
