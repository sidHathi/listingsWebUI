import { AxiosResponse } from 'axios';
import { ApiService } from './request';
import ScrapeQuery from '../models/scrapeQuery';

export interface ScrapeQueryApi {
    getQueries(): Promise<AxiosResponse | never>;
    createNewQuery(query: ScrapeQuery): Promise<AxiosResponse | never>;
}

export function scrapeQueryApi(apiService: ApiService): ScrapeQueryApi {
    async function getQueries(): Promise<AxiosResponse | never> {
        return apiService.request({
            method: 'GET',
            url: '/queries'
        })
        .then(response => response)
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        })
    }

    async function createNewQuery(query: ScrapeQuery): Promise<AxiosResponse | never> {
        return apiService.request({
            method: 'POST',
            url: '/queries',
            data: query
        })
        .then(response => response)
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        })
    }

    return {
        getQueries,
        createNewQuery
    };
}
