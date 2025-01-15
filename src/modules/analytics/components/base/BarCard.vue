<script setup lang='ts'>

    import { ref, onMounted, computed } from 'vue';
    import AnalyticCard from "~/src/modules/analytics/components/base/AnalyticCard.vue";

    // Props with TypeScript definitions
    const {stats, title} = defineProps<{
        stats: { name: string, percentage: number, value?: string }[],
        title: string
    }>();

    // Compute the maximum percentage value to normalize the widths
    const maxPercentage = computed(() => Math.max(...stats.map(stat => stat.percentage)));

    // Calculate the width based on the percentage relative to the maximum percentage
    function calculateWidth(percentage: number) {
        let width = ((percentage / maxPercentage.value) * 100)
        if(width > 11) {
            width = width - 10;
        } else if(width > 6) {
            width = width - 5;
        }

        return width;
    }

    // Reactive array to store the animated widths for each bar
    const animatedWidths = ref(stats.map(() => 0));

    // Update the widths when the component is mounted
    onMounted(() => {
        // Delay the width update to trigger the animation
        setTimeout(() => {
            animatedWidths.value = stats.map(stat => calculateWidth(stat.percentage));
        }, 100); // Delay of 100ms, adjust if needed
    });
</script>

<template>
    <AnalyticCard :title="title">
        <div class="overflow-x-auto">
            <table class="table-auto w-full">
                <tbody>
                <tr v-for="(stat, index) in stats" :key="index">
                    <td class="pr-4 text-nowrap lowercase">{{ stat.name }}</td>
                    <td class="w-full">
                        <div class="h-4  rounded">
                            <div
                                class="h-full bg-black rounded bar-animation"
                                :style="{ width: animatedWidths[index] + '%' }"
                            ></div>
                        </div>
                    </td>
                    <td class="pl-4">{{ stat.value ?? stat.percentage+'%' }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </AnalyticCard>
</template>

<style scoped>
.bar-animation {
    transition: width 1s ease-in-out;
}
</style>