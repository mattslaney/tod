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

export const useReadOnlyPhoneSettings = (): PhoneSettings => {
    const context = useContext(PhoneSettingsContext);
    if (!context) {
        throw new Error('useReadOnlyPhoneSettings must be used within a PhoneSettingsProvider');
    }
    return context.phoneSettings;
}

interface PhoneSettingsProviderProps {
    children: React.ReactNode;
  }

export const PhoneSettingsProvider = ({children}: PhoneSettingsProviderProps) => {
    let initialPhoneSettings = {
        username: '',
        password: '',
        server: '',
    };

    console.log(typeof window);
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