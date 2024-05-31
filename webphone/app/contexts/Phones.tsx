/*
The purpose of this Phone context is to be a provider of phone instances that cannot be serialized in the redux store
*/
import { createContext, useState } from "react";
import { PhoneConfig, SimplePhone } from "../utils/phoneUtils";

interface PhoneContextType {
    phones: SimplePhone[],
    addPhone: (config: PhoneConfig) => SimplePhone,
    getPhone: (id: number) => SimplePhone,
    updatePhone: (id: number, config: PhoneConfig) => SimplePhone
}

export const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

interface PhoneProviderProps {
    children?: React.ReactNode
}

export const PhoneProvider = ({children}: PhoneProviderProps) => {
    let [phones, setPhones] = useState<SimplePhone[]>([]);

    const addPhone = (config: PhoneConfig): SimplePhone => {
        if(config.username && config.password && config.server) {
            const phone = new SimplePhone(config);
            phones.push(phone);
            return phone;
        } else {
            throw Error("PhoneConfig incomplete");
        }
    }

    const updatePhone = (id: number, config: PhoneConfig): SimplePhone => {
        if(config.username && config.password && config.server) {
            const phone = new SimplePhone(config);
            phones[id] = phone;
            return phones[id];
        } else {
            throw Error("PhoneConfig incomplete");
        }
    }

    const getPhone = (id: number): SimplePhone => {
        return phones[id];
    }

    return (
        <PhoneContext.Provider value={{phones, addPhone, getPhone, updatePhone}}>
            {children}
        </PhoneContext.Provider>
    )
}