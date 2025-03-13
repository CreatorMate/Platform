<script setup lang='ts'>
    import PieChartCard from "~/src/modules/analytics/components/cards/base/PieChartCard.vue";
    import {onMounted} from "vue";
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {API} from "~/src/utils/API/API";

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
        const accountState = useAccountState();
        segments.value = [];
    const request: APIResponse<ContentType[]> = await API.ask(`/creator_api/brands/${accountState.brand?.id}/content_types?ids=${analyticsFilterState.getIds()}&days=${analyticsFilterState.days}`);
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