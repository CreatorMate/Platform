<script setup lang='ts'>
    const props = defineProps<{
        value: string
    }>();

    const {value} = toRefs(props);
</script>

<template>
    <p>{{value}}</p>
</template>