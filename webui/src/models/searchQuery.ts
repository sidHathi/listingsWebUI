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