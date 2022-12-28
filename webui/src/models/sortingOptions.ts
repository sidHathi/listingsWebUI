export const SortKeyVals = [
    'relevance',
    'priceLowToHigh',
    'priceHighToLow',
    'distance',
] as const;

export type SortKey = typeof SortKeyVals[number];

export const getText = (sortVal: SortKey) => {
    switch (sortVal) {
        case 'distance':
            return 'Distance from search location';
        case 'priceLowToHigh':
            return 'Price (Low to High)';
        case 'priceHighToLow':
            return 'Price (High to Low)';
        case 'relevance':
            return 'Relevance';
        default:
            return 'none';
    }
}
