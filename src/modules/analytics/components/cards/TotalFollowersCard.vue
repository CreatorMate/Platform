<script setup lang='ts'>
    import StatCard from "~/src/modules/analytics/components/cards/base/StatCard.vue";
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import type {APIResponse} from "~/api/utils/HonoResponses";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";

    const {ids} = defineProps<{
        ids: string
    }>();

    const value = ref(0);

    const analyticsFilterState = useAnalyticFilterState();
    watch(() => useAnalyticFilterState().actions, async () => {
            await getData();
        }
    );

    async function getData() {
        const accountStore = useAccountState();
        const requestAverage: APIResponse<number> = await $fetch(`/API/creator_api/statistics/${accountStore.brand?.id}/followers?ids=${analyticsFilterState.getIds() ?? ''}&days=${analyticsFilterState.days}`)
        if(!requestAverage.success) return;

        value.value = requestAverage.data;
    }

    onMounted(async () => {
        await getData();
    });


</script>

<template>
    <stat-card :title="`total followers`" :number="value" icon="solar:alt-arrow-down-line-duotone"></stat-card>
</template>