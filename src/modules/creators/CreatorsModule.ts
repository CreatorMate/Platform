import BaseModule from "../../utils/Modules/BaseModule";
import type {NuxtPage} from "@nuxt/schema";

export default class CreatorsModule extends BaseModule {
    protected moduleRoutes: NuxtPage[] = [
        {
            name: 'creators',
            file: '@/src/modules/creators/pages/CreatorsView.vue',
            path: '/creators'
        },
        {
            name: 'home',
            file: '@/src/modules/creators/pages/CreatorsView.vue',
            path: '/'
        }
    ]
}