<script setup lang='ts'>
    import StatCard from "~/src/modules/analytics/components/cards/base/StatCard.vue";
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";
    import {API} from "~/src/utils/API/API";

    const {ids, field} = defineProps<{
        ids: string, field: string, marker?: string
    }>();

    const value = ref(0);



    const analyticsFilterState = useAnalyticFilterState();
    watch(() => useAnalyticFilterState().actions, async () => {
            await getData();
        }
    );

    async function getData() {
        const accountStore = useAccountState();
        const requestAverage: APIResponse<{average: number}> = await API.ask(`/creator_api/brands/${accountStore.brand?.id}/statistics/average?key=${field}&ids=${analyticsFilterState.getIds() ?? ''}&days=${analyticsFilterState.days}`)
        if(!requestAverage.success) return;
        value.value = requestAverage.data.average;
    }

    onMounted(async () => {
        await getData();
    });


</script>

<template>
    <stat-card :title="`average ${field}`" :number="value" icon="solar:alt-arrow-down-line-duotone" :marker></stat-card>
</template>