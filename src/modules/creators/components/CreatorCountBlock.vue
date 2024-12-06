<script setup lang='ts'>
    import {Icon} from "@iconify/vue";

    const {name, number} = defineProps<{
        name: string,
        number: number
    }>();
</script>

<template>
    <div class="flex items-center gap-6 p-2 pr-20 bg-background-foreground border border-background rounded-lg card-1">
        <Icon width="32" icon="lineicons:users"></Icon>
        <div class="flex flex-col">
            <p class="text-sm">{{name}}</p>
            <p class="text-lg font-semibold text-text-dark">{{number}}</p>
        </div>
    </div>
</template>