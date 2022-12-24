import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useRequest } from "../services/useRequest";

export default function SearchResults(): JSX.Element {
    const { listingsApi } = useRequest();

    const [apiResponse, setApiResponse] = useState<AxiosResponse | null>(null)

    useEffect(() => {
        const getResponse = async (): Promise<void> => {
            const response = await listingsApi.searchListings({});
            setApiResponse(response);
        }

        getResponse();
    })

    return (
        <div>
            <p>Hello world</p>

            {apiResponse && apiResponse.status === 200 && apiResponse.data && (
                <p>
                    {JSON.stringify(apiResponse.data)}
                </p>
            )}
        </div>
    )
}