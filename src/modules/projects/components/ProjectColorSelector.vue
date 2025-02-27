<script setup lang='ts'>
    const model = defineModel();

    const {colors} = defineProps<{
        colors: {primary: string, secondary: string}[]
    }>()
</script>

<template>
    <div class="flex gap-2">
        <div :style="`background-color: ${color.primary}`" v-for="color of colors" :class="{'border': model == color.secondary}" @click="model = color.secondary" class="p-2 rounded cursor-pointer hover:border">
            <div :style="`background-color: ${color.secondary}`" class="w-4 h-4 bg-[#F1F1F1] rounded"></div>
        </div>
    </div>
</template>