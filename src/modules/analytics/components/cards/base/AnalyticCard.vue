<script setup lang='ts'>
    const {title, description} = defineProps<{title: string, description: string}>();
</script>

<template>
    <div class="w-full h-full border-[#E2E2E2] rounded-xl p-6">
        <p class="font-medium text-xl mb-6">{{title}}</p>
        <p class="text-gray-400">{{description}}</p>
        <slot></slot>
    </div>
</template>