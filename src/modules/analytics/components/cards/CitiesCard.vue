<script setup lang='ts'>

    import BarCard from "~/src/modules/analytics/components/cards/base/BarCard.vue";
    import {onMounted, type Ref} from "vue";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";

    const bars: Ref<{ name: string, percentage: number, value?: string }[]> = ref([]);

    const analyticsFilterState = useAnalyticFilterState();
    watch(() => useAnalyticFilterState().actions, async () => {
            await getData();
        }
    );

    async function getData() {
        const accountState = useAccountStore();
        const request: APIResponse<{
            key: string,
            value: number
        }[]> = await $fetch(`/API/creator_api/statistics/${accountState.brand?.id}/cities`);
        if (!request.success) return;

        for (const item of request.data) {
            const cityParts = item.key.split(',');
            bars.value.push(
                {
                    name: cityParts[0],
                    percentage: Math.round(item.value),
                    value: `${item.value}%`
                }
            );
        }
    }

    onMounted(async () => {
        await getData();
    });
</script>

<template>
    <BarCard v-if="bars.length > 0" title="Cities" :stats="
        bars"
    ></BarCard>
</template>