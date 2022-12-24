import { SearchLocation } from './locations';

export default interface SearchQuery {
    providerName?: string;
    location?: SearchLocation;
    leaseTerm?: number;
    bedrooms?: number;
    price?: number[];
    name?: string;
    reType?: string;
    pets?: boolean;
    transit?: boolean;
}