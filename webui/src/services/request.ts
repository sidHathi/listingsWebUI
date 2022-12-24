import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

// Defines request interceptors used across both api services
const requestInterceptors = {
    success: async (config: AxiosRequestConfig<any>) => config,
    error: (error: any) => {
        Promise.reject(error);
    }
};

export interface ApiService {
    baseURL: string;
    instance: AxiosInstance | null;
    request: (options: AxiosRequestConfig) => Promise<AxiosResponse> | Promise<never>;
    init: (baseURL: string) => void;
}

export const apiService: ApiService = {
    baseURL: '',
    instance: null,
    request: (options : AxiosRequestConfig) => {
        if (apiService.instance == null) {
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

        return apiService.instance({
            ...options,
            headers: {
            ...headers,
            ...options?.headers,
            },
        });
    },
    init: (baseURL: string) => {
        apiService.baseURL = baseURL;
        apiService.instance = axios.create({
            baseURL,
        });

        // REQUEST INTERCEPTORS
        apiService.instance.interceptors.request.use(
            requestInterceptors.success,
            requestInterceptors.error,
        );

        // RESPONSE INTERCEPTORS
        apiService.instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            Promise.reject(error);
        },
        );
    }
}
