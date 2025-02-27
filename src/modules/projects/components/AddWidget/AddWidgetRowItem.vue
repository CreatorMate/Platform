<script setup lang='ts'>

    import {Icon} from "@iconify/vue";

    const emits = defineEmits(['hover']);

    const props = defineProps<{
        title: string,
        metric: string,
        icon: string|null,
        selected: string
    }>();

    const {title, metric, icon, selected} = toRefs(props);
</script>

<template>
    <div @mouseenter="emits('hover')" :class="{'bg-gray-100': selected == title}" class="flex px-2 cursor-pointer py-2 mx-1 rounded items-center gap-2 text-sm">
        <Icon v-if="!icon" height="16" icon="material-symbols:widgets-outline-rounded"></Icon>
        <Icon v-else height="16" :icon></Icon>
        <p>{{title}}</p>
        <p class="text-xs text-gray-400">-- {{metric}}</p>
    </div>
</template>