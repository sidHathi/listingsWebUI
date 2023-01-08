import { AxiosResponse } from "axios";

export default function getCursor(axiosResponse: AxiosResponse | null): string | null {
    if (!axiosResponse || !axiosResponse.status || axiosResponse.status !== 200 || !axiosResponse.data || !axiosResponse.data.meta || !axiosResponse.data.meta.next_cursor) {
        return null;
    }

    return axiosResponse.data.meta.next_cursor as string;
}