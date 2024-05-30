import { useContext } from "react";
import { PhoneSettings, PhoneSettingsContext, PhoneSettingsContextType } from "../contexts/PhoneSettings";

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