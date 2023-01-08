export const providers = [
    'facebook',
    'rent.com',
    'apartments.com',
    'zillow',
    'airbnb',
] as const;

export type Provider = typeof providers[number];