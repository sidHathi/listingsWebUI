import { ApiService } from "./request";

import SearchQuery from "../models/searchQuery";
import { AxiosResponse } from "axios";

export interface ListingsApi {
    searchListings : (searchQuery: SearchQuery) => Promise<AxiosResponse | null>;
    getListing: (id: string) => Promise<AxiosResponse | null>;
}

export function listingsApi(apiService: ApiService): ListingsApi {
    async function searchListings(searchQuery: SearchQuery): Promise<AxiosResponse | null> {
        return apiService.request({
            method: "POST",
            url: `/listings/search/`,
            data: searchQuery
        })
        .then(response => response)
        .catch(error => {
            console.log(error);
            return null
        })
    }


    async function getListing(id: string): Promise<AxiosResponse | null> {
        return apiService.request({
            method: "POST",
            url: `/listings/${id}`,
        })
        .then(response => response)
        .catch(error => {
            console.log(error);
            return null
        })
    }

    return {
        searchListings,
        getListing,
    }
}