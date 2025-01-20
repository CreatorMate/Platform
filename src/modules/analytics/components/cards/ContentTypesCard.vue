<script setup lang='ts'>
    import PieChartCard from "~/src/modules/analytics/components/cards/base/PieChartCard.vue";
    import {onMounted} from "vue";
    import type {APIResponse} from "~/api/utils/HonoResponses";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";

    type ContentType = {
        type: string,
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
        const request: APIResponse<ContentType[]> = await $fetch(`/API/creator_api/statistics/${accountState.brand?.id}/content_types?ids=${analyticsFilterState.getIds()}&days=${analyticsFilterState.days}`);
        if (!request.success) return;

        for (const contentType of request.data) {
            segments.value.push({
                title: contentType.type,
                percentage: contentType.value,
            })
        }
    }

    onMounted(async () => {
        await getData();
    });

</script>

<template>
    <PieChartCard class="card-1" :segments title='content types'></PieChartCard>
</template>