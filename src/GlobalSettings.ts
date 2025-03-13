
export const appSettings = {
    unGuardedRoutes: [
        "/invitation",
        /^\/invitation\/[^/]+\/[^/]+$/,
        /^\/creators\/.*$/,
        "/creators",
        "/login"
    ],
    defaultLimit: 10,
    baseUrl: ''
}