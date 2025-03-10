import BaseModule from "../../utils/Modules/BaseModule";
import type {NuxtPage} from "@nuxt/schema";

export default class AnalyticsModule extends BaseModule {
    protected moduleRoutes: NuxtPage[] = [
        {
            name: 'analytics module',
            file: '@/src/modules/analytics/AnalyticsModule.vue',
            path: '/analytics-module',
            children: [
                {
                    name: 'analytics',
                    file: '@/src/modules/analytics/pages/AnalyticsView.vue',
                    path: '/analytics'
                },
                {
                    name: 'countries',
                    file: '@/src/modules/analytics/pages/countries.vue',
                    path: '/countries'
                }
            ],
        },

    ]
}