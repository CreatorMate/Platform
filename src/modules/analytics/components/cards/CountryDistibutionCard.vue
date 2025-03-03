<script setup lang='ts'>

    import BarCard from "~/src/modules/analytics/components/cards/base/BarCard.vue";
    import {onMounted, type Ref} from "vue";
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";
    import {sortKeyValueObject} from "~/src/utils/utils";

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
        const request: APIResponse = await $fetch(`/API/creator_api/brands/${accountState.brand?.id}/countries?ids=${analyticsFilterState.getIds()}&days=${analyticsFilterState.days}`);
        if (!request.success) return;

        const items = sortKeyValueObject<number>(request.data, 10, true);

        bars.value = [];

        for (const [key, item] of Object.entries(items)) {
            bars.value.push(
                {
                    name: key,
                    percentage: Math.round(item as number),
                    value: `${item}%`
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
    <BarCard v-if="bars.length > 0 && !loading" title="Countries" :stats="bars"
    ></BarCard>
</template>