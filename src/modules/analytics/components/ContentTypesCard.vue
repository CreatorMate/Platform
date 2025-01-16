<script setup lang='ts'>
    import PieChartCard from "~/src/modules/analytics/components/base/PieChartCard.vue";
    import {onMounted} from "vue";
    import type {APIResponse} from "~/api/utils/HonoResponses";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";

    type ContentType = {
        type: string,
        value: number
    }

    const segments = ref<{ percentage: number, title: string }[]>([]);

    onMounted(async () => {
        const accountState = useAccountStore();
        const request: APIResponse<ContentType[]> = await $fetch(`/API/creator_api/statistics/${accountState.brand?.id}/content_types`);
        if (!request.success) return;

        for (const contentType of request.data) {
            segments.value.push({
                title: contentType.type,
                percentage: contentType.value,
            })
        }
    })
</script>

<template>
    <PieChartCard :segments title='content types'></PieChartCard>
</template>