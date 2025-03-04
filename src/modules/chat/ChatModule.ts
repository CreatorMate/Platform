import BaseModule from "../../utils/Modules/BaseModule";
import type {NuxtPage} from "@nuxt/schema";

export default class ChatModule extends BaseModule {
    protected moduleRoutes: NuxtPage[] = [
        {
            name: 'chat',
            file: '@/src/modules/chat/pages/ChatView.vue',
            path: '/chat'
        }
    ];
}