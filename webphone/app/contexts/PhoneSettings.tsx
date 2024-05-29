import React, { createContext, useState, useContext } from 'react';

interface PhoneSettings {
    username: string,
    password: string,
    server: string
}

interface PhoneSettingsContextType {
  phoneSettings: PhoneSettings;
  updatePhoneSettings: (newSettings: PhoneSettings) => void;
}

const PhoneSettingsContext = createContext<PhoneSettingsContextType | undefined>(undefined);

export const usePhoneSettings = (): PhoneSettingsContextType => {
    const context = useContext(PhoneSettingsContext);
    if (!context) {
        throw new Error('usePhoneSettings must be used within a PhoneSettingsProvider');
    }
    return context;
}

interface PhoneSettingsProviderProps {
    children: React.ReactNode;
  }

export const PhoneSettingsProvider = ({children}: PhoneSettingsProviderProps) => {
    const [phoneSettings, setPhoneSettings] = useState<PhoneSettings>({
        username: '',
        password: '',
        server: '',
    });
    
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