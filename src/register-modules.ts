import type BaseModule from "./utils/Modules/BaseModule";
import type {NuxtPage} from "@nuxt/schema";
import AnalyticsModule from "./modules/analytics/AnalyticsModule";
import SettingsModule from "./modules/settings/SettingsModule";
import {ContentModule} from "./modules/content/ContentModule";
import CreatorModule from "./modules/creators/CreatorModule";
import ProjectModule from "./modules/projects/ProjectModule";
import ChatModule from "./modules/chat/ChatModule";

const modules: BaseModule[] = [
    new AnalyticsModule(),
    new CreatorModule(),
    new SettingsModule(),
    new ContentModule(),
    new ProjectModule(),
    new ChatModule(),
];
export function getModuleRoutes() {
    const routes: NuxtPage[] = [];
    for(const module of modules) {
        routes.push(...module.getModuleRoutes());
    }

    return routes;
}