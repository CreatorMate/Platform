
export const appSettings = {
    unGuardedRoutes: [
        "/invitation",
        /^\/invitation\/[^/]+\/[^/]+$/,
        /^\/creators\/.*$/,
        "/creators"
    ],
    defaultLimit: 10,
    baseUrl: ''
}