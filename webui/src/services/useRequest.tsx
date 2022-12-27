import { useEffect } from "react";

import sanitizedConfig from "../config";
import { apiService } from "./request";
import { listingsApi, ListingsApi } from "./listingsApi"
import { CitiesApi, citiesApi } from "./citiesApi";

export interface Apis {
    listingsApi: ListingsApi;
    citiesApi: CitiesApi;
}

export function useRequest() : Apis {
    const apiUrl: string = sanitizedConfig.REACT_APP_API_URL;

    useEffect(() => apiService.init(apiUrl));

    return {
        listingsApi: listingsApi(apiService),
        citiesApi: citiesApi(apiService),
    };
}