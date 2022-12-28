export const SortKeyVals = [
    'relevance',
    'priceLowToHigh',
    'priceHighToLow',
    'distance',
] as const;

export type SortKey = typeof SortKeyVals[number];
