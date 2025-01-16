import BaseModule from "../../utils/Modules/BaseModule";
import type {NuxtPage} from "@nuxt/schema";

export default class CreatorsModule extends BaseModule {
    protected moduleRoutes: NuxtPage[] = [
        {
            name: 'settings',
            file: '@/src/modules/settings/pages/SettingsView.vue',
            path: '/settings'
        }
    ]
}