export const ROUTES = {
    FEED: '/feed',
    AUTH: '/auth'
} as const;

// Type for route paths
export type RoutePath = typeof ROUTES[keyof typeof ROUTES];