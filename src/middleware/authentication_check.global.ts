import type {RouteLocationNormalized} from "#vue-router";
import {settings} from "~/src/GlobalSettings";

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if(settings.unGuardedRoutes.includes(to.path)) return;
    const {login, loggedIn} = useOidcAuth();
    if(!loggedIn.value) {
        await login();
    }
});