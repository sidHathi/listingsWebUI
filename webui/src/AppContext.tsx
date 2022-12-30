import React, { PropsWithChildren, useState, useEffect } from "react";
import City from "./models/city";
import { useRequest } from "./services/useRequest";
import parse from "./services/parse";

export const AppContext = React.createContext<{cities: City[] | null}>({cities: null});

interface AppContextProps {
    children: React.ReactNode;
}

export const AppContextProvider = (props: PropsWithChildren<AppContextProps>) => {
    const { children } = props;
    const { citiesApi } = useRequest();

    const [ cities, setCities ] = useState<City[] | null>(null);

    React.useEffect(() => {
        if (cities != null) return;
        const getCitiesList = async () => {
            const res = await citiesApi.get_cities_details();
            const citiesList = parse<City[]>(res);

            if (citiesList != null) {
                console.log(citiesList);
                setCities(citiesList);
            }
        };

        getCitiesList();
    }, [cities, setCities, citiesApi]);

    /* Now we are dealing with a context instead of a Hook, so instead
        of returning the width and height we store the values in the
        value of the Provider */
    return (
        <AppContext.Provider value={{ cities }}>
            {children}
        </AppContext.Provider>
    );
};