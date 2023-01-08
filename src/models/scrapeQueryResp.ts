export default interface ScrapeQueryResp {
    name: string;
    location: string;
    reType: string;
    bedrooms: number;
    priceRange: number[];
    leaseDuration: number;
    pets: boolean;
    transit: boolean;
}