import { AxiosResponse } from "axios";
import { ApiService } from "./request";

export interface CitiesApi {
    get_cities: () => Promise<AxiosResponse | never>;
    get_cities_details: () => Promise<AxiosResponse | never>;
}

export function citiesApi(apiService: ApiService) : CitiesApi {
    const get_cities = async () => {
        return apiService.request({
            method: 'GET',
            url: '/cities/',
        })
        .then((res) => res)
        .catch((error) => {
            console.error(error);
            return Promise.reject(error);
        });
    };

    const get_cities_details = async () => {
        return apiService.request({
            method: 'GET',
            url: '/cities/detail/',
        })
        .then((res) => res)
        .catch((error) => {
            console.error(error);
            return Promise.reject(error);
        });
    };

    return {
        get_cities,
        get_cities_details,
    };
}