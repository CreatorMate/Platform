<template>
    <AnalyticCard :title="title">
        <div class="w-full flex justify-center">
            <div class="h-[170px] w-[170px]">
                <pie-chart :segments="segments"></pie-chart>
            </div>
        </div>
        <div v-for="segment of segments" class="mt-2.5 flex w-full justify-between">
            <div class="flex items-center gap-2">
                <div :style="`background-color: ${segment.color}`" class="h-8 w-4"></div>
                <p>{{segment.title}}</p>
            </div>
            <p>{{segment.percent}}%</p>
        </div>
    </AnalyticCard>

</template>

<script setup lang="ts">
    import PieChart from "~/components/Analytics/PieChart.vue";
    import AnalyticCard from "~/components/Analytics/AnalyticCard.vue";

    interface Segment {
        color: string;
        percent: number;
        title: string;
    }
    const {segments, title} = defineProps<{
        segments: Segment[],
        title: string
    }>();
</script>
