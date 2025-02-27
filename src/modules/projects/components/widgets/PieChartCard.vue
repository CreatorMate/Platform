<script setup lang='ts'>
    import PieChartCard from "~/src/modules/analytics/components/cards/base/PieChartCard.vue";

    const props = defineProps<{
        segments: { percentage: number, title: string }[],
        description: string
    }>();

    const {segments, description} = toRefs(props);
</script>

<template>
    <PieChartCard :description class="card-1" :segments title='content types'></PieChartCard>
</template>