import { DBLocation } from "./locations";

export default interface ScrapeQuery {
    name: string;
    location: DBLocation;
    reType: string;
    bedrooms: number;
    priceRange: number[];
    leaseDuration: number;
    pets: boolean;
    transit: boolean;
}

export const defaultScrapeQuery: ScrapeQuery = {
    name: Date().toString(),
    location: {
        lat: 0,
        long: 0,
        address: '',
    },
    bedrooms: 1,
    reType: 'apartment',
    priceRange: [0, 10000],
    leaseDuration: 12,
    pets: false,
    transit: false
}

export const QUERY_LIMIT = 20;