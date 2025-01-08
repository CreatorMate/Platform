<script setup lang='ts'>
    import {Icon} from "@iconify/vue";

    const {icon, title, number} = defineProps<{
        icon: string,
        title: string,
        number: number
    }>();
</script>

<template>
    <div class="w-full h-full flex flex-col gap-3 p-6 text-black rounded-xl border border-[#E2E2E2]">
        <Icon width="32" icon="material-symbols:groups-outline" />
        <p class="text-xl font-semibold">{{title}}</p>
        <p class="text-black font-bold text-4xl">{{number}}</p>
    </div>
</template>