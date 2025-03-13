<script setup lang='ts'>
    import {Icon} from "@iconify/vue";

    const props = defineProps<{
        icon: string,
        title: string,
        description: string,
        number: number,
        marker?: string
    }>();

    const {icon, title, number, marker} = toRefs(props);
</script>

<template>
    <div class="w-full h-full flex flex-col gap-3 p-6 text-black rounded-xl border-[#E2E2E2]">
        <Icon width="32" icon="material-symbols:groups-outline" />
        <p class="text-xl font-semibold">{{title}}</p>
        <p class="text-gray-400">{{description}}</p>
        <p class="text-black font-bold text-4xl">{{number ?? 0}}{{marker ?? ''}}</p>
    </div>
</template>