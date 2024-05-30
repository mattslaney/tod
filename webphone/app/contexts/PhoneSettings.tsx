import React, { createContext, useState, useContext } from 'react';

export interface PhoneSettings {
    username: string,
    password: string,
    server: string,
    error?: string
}

export interface PhoneSettingsContextType {
  phoneSettings: PhoneSettings;
  updatePhoneSettings: (newSettings: PhoneSettings) => void;
}

export const PhoneSettingsContext = createContext<PhoneSettingsContextType | undefined>(undefined);

interface PhoneSettingsProviderProps {
    children: React.ReactNode;
  }

export const PhoneSettingsProvider = ({children}: PhoneSettingsProviderProps) => {
    let initialPhoneSettings = {
        username: '',
        password: '',
        server: '',
    };

    if(typeof window !== 'undefined') {
        const storedPhoneSettings = localStorage.getItem('phoneSettings');
        initialPhoneSettings = storedPhoneSettings ? JSON.parse(storedPhoneSettings) : initialPhoneSettings
    }

    const [phoneSettings, setPhoneSettings] = useState<PhoneSettings>(initialPhoneSettings);
    
    const updatePhoneSettings = (newSettings: PhoneSettings) => {
        setPhoneSettings(newSettings);

        localStorage.setItem('phoneSettings', JSON.stringify(newSettings));
    };

    return (
        <PhoneSettingsContext.Provider value={{phoneSettings, updatePhoneSettings}}>
            {children}
        </PhoneSettingsContext.Provider>
    )
}