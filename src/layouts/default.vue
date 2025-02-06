<script setup lang='ts'>
    import Sidebar from "~/src/components/Sidebar/Sidebar.vue";
    import {useFrameState} from "~/src/utils/FrameState";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import {Icon} from "@iconify/vue";

    const frameRef = ref<HTMLDivElement | null>(null);

    const frameState = useFrameState();

    const accountState = useAccountStore();

    onMounted(() => {
        frameState.setFrameRef(frameRef);
    });
</script>

<template>
    <main class="text-background-text flex screen-size p-3 gap-5">
        <Sidebar></Sidebar>
        <div v-if="accountState.user" ref="frameRef" class="p-6 flex flex-grow bg-background-foreground rounded-3xl overflow-y-scroll">
            <slot v-if="accountState.user.brands" :frameRef="frameRef"></slot>
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