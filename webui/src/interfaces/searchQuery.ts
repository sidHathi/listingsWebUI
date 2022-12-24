import Location from './location';

export default interface SearchQuery {
    providerName: string | undefined;
    location: Location | undefined;
    leaseTerm: number | undefined;
    bedrooms: number | undefined;
    price: number[] | undefined;
    name: string | undefined;
    reType: string | undefined;
    pets : boolean | undefined;
    transit: boolean | undefined;
}