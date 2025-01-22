import BaseModule from "../../utils/Modules/BaseModule";
import type {NuxtPage} from "@nuxt/schema";

export class CreatorModule extends BaseModule {
    protected moduleRoutes: NuxtPage[] = [
        {
            name: 'creators',
            file: '@/src/modules/creators/CreatorsBaseModule.vue',
            path: '/creators',
            children: [
                {
                    name: 'creator login',
                    file: '@/src/modules/creators/pages/CreatorLoginView.vue',
                    path: '/creators/login',
                },
                {
                    name: 'creator permissions',
                    file: '@/src/modules/creators/pages/CreatorPermissions.vue',
                    path: '/creators/permissions',
                },
                {
                    name: 'creator invitation',
                    file: '@/src/modules/creators/pages/CreatorInvite.vue',
                    path: '/creators/invited',
                },
            ]
        }
    ]
}