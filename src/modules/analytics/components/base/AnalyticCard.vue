<script setup lang='ts'>
    const {title} = defineProps<{title: string}>();
</script>

<template>
    <div class="w-full h-full border border-[#E2E2E2] rounded-xl p-6">
        <p class="font-medium text-xl mb-6">{{title}}</p>
        <slot></slot>
    </div>
</template>