import type {RouteLocationNormalized} from "#vue-router";
import {useAccountStore} from "~/src/utils/Auth/AccountStore";
import {checkUnguarded} from "~/src/utils/GuardChecker";

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const {login, loggedIn} = useOidcAuth();
    if(checkUnguarded(to)) return;

    const accountStore = useAccountStore();
    try {
        if(accountStore.user) return;
        await accountStore.initialize();
    } catch (error) {
        console.error('Failed to initialize session:', error);
    }
});