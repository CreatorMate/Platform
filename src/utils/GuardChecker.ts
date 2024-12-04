import type {RouteLocationNormalized} from "#vue-router";
import {settings} from "~/src/GlobalSettings";

export function checkUnguarded(to: RouteLocationNormalized) {
    return settings.unGuardedRoutes.some((routePattern: string | RegExp) => {
        if (routePattern instanceof RegExp) {
            return routePattern.test(to.path);
        }

        return routePattern === to.path;
    })
}