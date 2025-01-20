<script setup lang='ts'>

    import BarCard from "~/src/modules/analytics/components/cards/base/BarCard.vue";
    import {onMounted, type Ref} from "vue";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
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
        const accountState = useAccountStore();
        loading.value = true;
        const request: APIResponse = await $fetch(`/API/creator_api/statistics/${accountState.brand?.id}/gender_ages?ids=${analyticsFilterState.getIds()}&days=${analyticsFilterState.days}`);
        if (!request.success) return;

        bars.value = [];
        const items = sortKeyValueObject<number>(request.data, 10, true);

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
    <BarCard v-if="bars.length > 0 && !loading" title="Ages by gender" :stats="
        bars"
    ></BarCard>
</template>