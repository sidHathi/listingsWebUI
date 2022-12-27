import { AxiosResponse } from "axios";

export default function parse<T>(axiosResponse: AxiosResponse | null): T | null {
    if (!axiosResponse || axiosResponse.status === undefined || axiosResponse.status !== 200 || axiosResponse.data === undefined || axiosResponse.data.data === undefined) {
        return null;
    }

    console.log(axiosResponse.data.data)
    return axiosResponse.data.data as T;
}