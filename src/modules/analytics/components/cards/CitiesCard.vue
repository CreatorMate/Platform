<script setup lang='ts'>

    import BarCard from "~/src/modules/analytics/components/cards/base/BarCard.vue";
    import {onMounted, type Ref} from "vue";
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";
    import {sortByKey} from "~/src/utils/utils";

    const bars: Ref<{ name: string, percentage: number, value?: string }[]> = ref([]);
    const loading = ref(false);

    const analyticsFilterState = useAnalyticFilterState();
    watch(() => useAnalyticFilterState().actions, async () => {
            await getData();
        }
    );

    async function getData() {
        const accountState = useAccountState();
        loading.value = true;
        const request: APIResponse<{
            key: string,
            value: number
        }[]> = await $fetch(`/API/creator_api/statistics/${accountState.brand?.id}/cities?ids=${analyticsFilterState.getIds()}&days=${analyticsFilterState.days}`);
        if (!request.success) return;

        bars.value = [];
        const items = sortByKey<{key: string, value: string}>(request.data, 'value', true, 10);

        for (const item of items) {
            const cityParts = item.key.split(',');
            bars.value.push(
                {
                    name: cityParts[0],
                    percentage: Math.round(item.value),
                    value: `${item.value}%`
                }
            );
        }

        loading.value = false;
    }

    onMounted(async () => {
        await getData();
    });
</script>

<template>
    <BarCard v-if="bars.length > 0 && !loading" title="Cities" :stats="
        bars"
    ></BarCard>
</template>