<script setup lang='ts'>

    import Sidebar from "~/src/components/Sidebar/Sidebar.vue";
    import {useFrameState} from "~/src/utils/FrameState";

    const frameRef = ref<HTMLDivElement | null>(null);

    const frameState = useFrameState();

    onMounted(() => {
        frameState.setFrameRef(frameRef);
    })
</script>

<template>
    <main class="text-background-text flex screen-size p-3 gap-5">
        <Sidebar></Sidebar>
        <div ref="frameRef" class="p-6 flex flex-grow bg-background-foreground rounded-3xl overflow-y-scroll">
            <slot :frameRef="frameRef"></slot>
        </div>
    </main>
</template>