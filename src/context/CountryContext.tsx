import React, { ReactElement } from "react";

export interface ICountry {
    country: Country;
}

export interface ICountryContext {
    country: Country;
    setCountry: (country: Country) => void;
}

export enum Country {
    US = "US",
}

export const CountryContext = React.createContext<ICountryContext | null>(null);

const CountryProvider = ({ children }: any) => {
    const [country, setCountry] = React.useState<Country>(Country.US);

    return (
        <CountryContext.Provider value={{ country, setCountry }}>
            {children}
        </CountryContext.Provider>
    );
}

export default CountryProvider;