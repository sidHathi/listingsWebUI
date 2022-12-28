import { AxiosResponse } from "axios";

export default function getCursor(axiosResponse: AxiosResponse | null): string | null {
    if (!axiosResponse || !axiosResponse.status || axiosResponse.status !== 200 || !axiosResponse.data || !axiosResponse.data.meta || !axiosResponse.data.meta.cursor) {
        return null;
    }

    return axiosResponse.data.meta.cursor as string;
}