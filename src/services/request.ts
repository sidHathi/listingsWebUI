/**
 * request.ts
 * 
 * Defines the  apiService object used to make requests to the
 * listings API using a shared axios instance.
 * Includes response interceptors.
 */

import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

// Defines request interceptors used across both api services
const requestInterceptors = {
    success: async (config: AxiosRequestConfig<any>) => config,
    error: (error: any) => {
        Promise.reject(error);
    }
};

// Type annotation for apiService
export interface ApiService {
    baseURL: string;
    instance: AxiosInstance | null;
    request: (options: AxiosRequestConfig) => Promise<AxiosResponse> | Promise<never>;
    init: (baseURL: string) => void;
}

export const apiService: ApiService = {
    baseURL: '',
    instance: null,
    request: function(options: AxiosRequestConfig): Promise<AxiosResponse> | Promise<never> {
        if (this.instance == null) {
            return Promise.reject();
        }

        const headers = {};
        const filteredOptions = {...options};
        if (options?.data !== undefined) {
            filteredOptions.data = Object.fromEntries(
                Object.entries(options.data).filter(([key, value]) => 
                value !== undefined && key !== undefined)
            );
        }

        return this.instance({
            ...options,
            headers: {
                ...headers,
                ...options?.headers,
            },
        });
    },
    init: function(baseURL: string) : void {
        this.baseURL = baseURL;
        this.instance = axios.create({
            baseURL,
        });

        // REQUEST INTERCEPTORS
        this.instance.interceptors.request.use(
            requestInterceptors.success,
            requestInterceptors.error,
        );

        // RESPONSE INTERCEPTORS
        this.instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                Promise.reject(error);
            },
        );
    }
}
