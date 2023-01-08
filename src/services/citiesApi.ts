import { AxiosResponse } from "axios";
import { ApiService } from "./request";

export interface CitiesApi {
    getCities: () => Promise<AxiosResponse | never>;
    getCityDetails: () => Promise<AxiosResponse | never>;
}

export function citiesApi(apiService: ApiService) : CitiesApi {
    const getCities = async () => {
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

    const getCityDetails = async () => {
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
        getCities,
        getCityDetails,
    };
}