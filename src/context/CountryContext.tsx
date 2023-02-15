import React, { ReactElement } from "react";

export interface ICountry {
    country: string;
}

export interface ICountryContext {
    showLogIn: boolean;
    setShowLogIn: (state: boolean) => void;
}

export const CountryContext = React.createContext<ICountryContext | null>(null);

const CountryProvider = ({ children }: any) => {
    const [showLogIn, setShowLogIn] = React.useState<boolean>(false);

    return (
        <CountryContext.Provider value={{ showLogIn, setShowLogIn }}>
            {children}
        </CountryContext.Provider>
    );
}

export default CountryProvider;