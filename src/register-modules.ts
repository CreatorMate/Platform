import type BaseModule from "./utils/Modules/BaseModule";
import type {NuxtPage} from "@nuxt/schema";
import AnalyticsModule from "./modules/analytics/AnalyticsModule";
import HomeModule from "./modules/home/HomeModule";
import SettingsModule from "./modules/settings/SettingsModule";
import {ContentModule} from "./modules/content/ContentModule";
import {CreatorModule} from "./modules/creators/CreatorModule";

const modules: BaseModule[] = [
    new AnalyticsModule(),
    new HomeModule(),
    new SettingsModule(),
    new ContentModule(),
    new CreatorModule()
];
export function getModuleRoutes() {
    const routes: NuxtPage[] = [];
    for(const module of modules) {
        routes.push(...module.getModuleRoutes());
    }

    return routes;
}