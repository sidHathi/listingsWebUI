import { SearchLocation } from './locations';
import { SortKey } from './sortingOptions';
import { Provider } from './providers';

export default interface SearchQuery {
    providerNames?: Provider[];
    location: SearchLocation;
    address: string;
    leaseTerm?: number;
    bedrooms?: number;
    price?: number[];
    name?: string;
    reType?: string;
    pets?: boolean;
    transit?: boolean;
    sortBy?: SortKey;
    cursor?: string;
}

export function encodeSearchQuery(query: SearchQuery) : { [key: string]: string } {
    return Object.fromEntries(Object.entries(query).filter(([key, val]) => {
        if (val !== undefined && key !== undefined) {
            return true;
        }
        return false
    }).map(([key, val]) => {
        return [key, JSON.stringify(val)]
    }))
}

export function parseUrlQuery(query: URLSearchParams) : SearchQuery {
    const constructedQuery: {[key: string]: any} = {}
    query.forEach((val, key) => {
        console.log(key)
        console.log(val)
        constructedQuery[key] = JSON.parse(val)
    })
    return constructedQuery as SearchQuery
}