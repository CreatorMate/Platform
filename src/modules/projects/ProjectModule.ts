import BaseModule from "../../utils/Modules/BaseModule";
import type {NuxtPage} from "@nuxt/schema";
export default class ProjectModule extends BaseModule {
    protected moduleRoutes: NuxtPage[] = [
        {
            name: 'project',
            file: '@/src/modules/projects/pages/ProjectView.vue',
            path: '/projects/:id/:name',
            props: true
        },
        {
            name: 'metrics',
            file: '@/src/modules/projects/pages/MetricsView.vue',
            path: '/metrics',
        },
        {
            name: 'widgets',
            file: '@/src/modules/projects/pages/WidgetsView.vue',
            path: '/widgets',
        },
        {
            name: 'projects',
            file: '@/src/modules/projects/pages/ProjectOverview.vue',
            path: '/projects',
        }
    ]
}