<script setup lang='ts'>

    import BarCard from "~/src/modules/analytics/components/cards/base/BarCard.vue";

    const loading = ref(false);

    const {title, bars, description} = defineProps<{
        title: string,
        bars: { name: string, percentage: number, value?: string }[],
        description: string
    }>();

</script>

<template>
    <BarCard v-if="bars.length > 0 && !loading" :title :description :stats="bars"
    ></BarCard>
</template>