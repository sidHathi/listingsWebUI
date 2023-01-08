import { ApiService } from "./request";

import SearchQuery from "../models/searchQuery";
import { AxiosResponse } from "axios";

export interface ListingsApi {
    searchListings : (searchQuery: SearchQuery, queryParams?: {[key: string]: any}) => Promise<AxiosResponse | never>;
    getListing: (id: string) => Promise<AxiosResponse | never>;
}

export function listingsApi(apiService: ApiService): ListingsApi {
    async function searchListings(searchQuery: SearchQuery, queryParams?: {[key: string]: any}): Promise<AxiosResponse | never> {
        console.log(queryParams);
        return apiService.request({
            method: "POST",
            url: `/listings/search/`,
            data: searchQuery,
            params: queryParams,
        })
        .then(response => response)
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        })
    }


    async function getListing(id: string): Promise<AxiosResponse | never> {
        return apiService.request({
            method: "POST",
            url: `/listings/${id}`,
        })
        .then(response => response)
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        })
    }

    return {
        searchListings,
        getListing,
    }
}