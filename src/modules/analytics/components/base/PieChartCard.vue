<template>
    <AnalyticCard :title="title">
        <div class="w-full flex justify-center">
            <div class="h-[170px] w-[170px]">
                <pie-chart :segments="segments"></pie-chart>
            </div>
        </div>
        <div v-for="(segment, index) of segments" :key="index" class="mt-2.5 flex w-full justify-between">
            <div class="flex items-center gap-2">
                <div :style="`background-color: ${colors[index]}`" class="h-8 w-4"></div>
                <p class="lowercase">{{segment.title}}</p>
            </div>
            <p>{{segment.percentage}}%</p>
        </div>
    </AnalyticCard>

</template>

<script setup lang="ts">
    import PieChart from "~/src/modules/analytics/components/base/PieChart.vue";
    import AnalyticCard from "~/src/modules/analytics/components/base/AnalyticCard.vue";
    interface Segment {
        percentage: number;
        title: string;
    }

    const colors: string[] = ['#85ACC4', '#EB9CD0', '#7BEC88', '#F3C486', '#3493ce', '#73268d']

    const {segments, title} = defineProps<{
        segments: Segment[],
        title: string
    }>();
</script>
