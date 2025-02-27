<script setup lang="ts">
    import {computed, type PropType} from 'vue';
    interface Segment {
        percentage: number;
    }

    const colors: string[] = ['#7EC3BE', '#8CC2A9', '#BAB798', '#CAB19E', '#D2ACB0', '#BCB2CE','#9EBACE', '#EB9CD0', '#7BEC88', '#F3C486', '#3493ce', '#73268d']

    const {segments} = defineProps({
        segments: {
            type: Array as PropType<Segment[]>,
            required: true,
        },
    });

    const getStrokeDasharray = (percent: number) => {
        const circumference = 2 * Math.PI * 40;
        return percent === 100
            ? `${circumference} 0`
            : `${(circumference * percent) / 100} ${circumference}`;
    };

    const getStrokeDashoffset = (index: number) => {
        const totalPercent = segments
            .slice(0, index)
            .reduce((sum, segment) => sum + segment.percentage, 0);
        const circumference = 2 * Math.PI * 40;
        return -(circumference * totalPercent) / 100;
    };
</script>

<template>
    <div class="relative w-full h-full">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <circle
                v-for="(segment, index) in segments"
                :key="index"
                :stroke="colors[index]"
                stroke-width="16"
                fill="none"
                r="40"
                cx="50"
                cy="50"
                :stroke-dasharray="getStrokeDasharray(segment.percentage)"
                :stroke-dashoffset="getStrokeDashoffset(index)"
                transform="rotate(-90 50 50)"
            />
        </svg>
    </div>
</template>