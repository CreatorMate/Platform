import BaseModule from "../../utils/Modules/BaseModule";
import type {NuxtPage} from "@nuxt/schema";

export default class HomeModule extends BaseModule {
    protected moduleRoutes: NuxtPage[] = [
        {
            name: 'home',
            file: '@/src/modules/home/pages/HomeView.vue',
            path: '/'
        }
    ]
}