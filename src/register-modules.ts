import type BaseModule from "./utils/Modules/BaseModule";
import type {NuxtPage} from "@nuxt/schema";
import AnalyticsModule from "./modules/analytics/AnalyticsModule";
import CreatorsModule from "./modules/creators/CreatorsModule";
import SettingsModule from "./modules/settings/SettingsModule";

const modules: BaseModule[] = [
    new AnalyticsModule(),
    new CreatorsModule(),
    new SettingsModule(),
];
export function getModuleRoutes() {
    const routes: NuxtPage[] = [];
    for(const module of modules) {
        routes.push(...module.getModuleRoutes());
    }

    return routes;
}