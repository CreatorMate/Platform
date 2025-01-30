<script setup lang='ts'>
    import PieChartCard from "~/src/modules/analytics/components/cards/base/PieChartCard.vue";
    import {onMounted} from "vue";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";

    type Gender = {
        key: string,
        value: number
    }

    const segments = ref<{ percentage: number, title: string }[]>([]);


    const analyticsFilterState = useAnalyticFilterState();
    watch(() => useAnalyticFilterState().actions, async () => {
            await getData();
        }
    );

    async function getData() {
        const accountState = useAccountStore();
        segments.value = [];
        const request: APIResponse<Gender[]> = await $fetch(`/API/creator_api/statistics/${accountState.brand?.id}/genders?ids=${analyticsFilterState.getIds()}&days=${analyticsFilterState.days}`);

        if (!request.success) return;

        for (const contentType of request.data) {
            segments.value.push({
                title: contentType.key,
                percentage: contentType.value,
            })
        }

        let total = 0;
        for(const segment of segments.value) {
            total += segment.percentage
        }

        if(total < 99) {
            segments.value.push({
                percentage: 100 - total,
                title: 'not enough data'
            })
        }
    }

    onMounted(async () => {
        await getData();
    });

</script>

<template>
    <PieChartCard class="card-2" :segments title='genders'></PieChartCard>
</template>