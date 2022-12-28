export const providers = [
    'facebook',
    'rent.com'
] as const;

export type Provider = typeof providers[number];