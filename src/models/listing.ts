import { DBLocation } from './locations'

export default interface Listing {
    _id: string;
    url: string;
    providerName: string;
    name: string;
    location: DBLocation;
    reType: string;
    bedrooms: number[];
    price: number;
    shortestLease: number;
    pets: boolean;
    transit: boolean;
    scrapeTime: string;
}