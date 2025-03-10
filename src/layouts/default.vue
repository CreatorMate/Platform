<script setup lang='ts'>
    import Sidebar from "~/src/components/Sidebar/Sidebar.vue";
    import {useFrameState} from "~/src/utils/FrameState";
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import {Icon} from "@iconify/vue";
    import SettingsView from "~/src/modules/settings/pages/SettingsView.vue";

    const frameRef = ref<HTMLDivElement | null>(null);

    const frameState = useFrameState();

    const accountState = useAccountState();
    const router = useRouter();
    const route = useRoute();
    const ready = ref(false);

    onMounted(() => {
        frameState.setFrameRef(frameRef);

        if(!accountState.brand?.is_premium && !route.path.includes('instagram')) {
            router.replace('/settings');
        }

        ready.value = true;
    });
</script>

<template>
    <main class="text-background-text flex screen-size max-screen-size p-3 gap-5">
        <Sidebar></Sidebar>
        <div v-if="accountState.user && ready" ref="frameRef" class="p-6 flex flex-grow bg-background-foreground rounded-3xl overflow-y-scroll">
            <slot v-if="accountState.brand" :frameRef="frameRef"></slot>
            <div v-else class="w-full h-full flex justify-center items-center flex-col">
                this account is not linked to a brand, if this is a mistake
                <p>please contact us at <span class="underline">hello@creatormate.com</span></p>
            </div>
        </div>
        <div v-else class="p-6 flex-grow bg-background-foreground rounded-3xl flex overflow-y-scroll">
            <div class="justify-center items-center flex w-full h-full">
                <Icon width="64" icon="line-md:loading-loop"></Icon>
            </div>
        </div>
    </main>
</template>