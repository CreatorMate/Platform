import BaseModule from "../../utils/Modules/BaseModule";
import type {NuxtPage} from "@nuxt/schema";

export class ContentModule extends BaseModule {
    protected moduleRoutes: NuxtPage[] = [
        {
            name: 'content',
            file: '@/src/modules/content/pages/content.vue',
            path: '/content'
        }
    ]
}