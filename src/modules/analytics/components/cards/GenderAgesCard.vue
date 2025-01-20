<script setup lang='ts'>

    import BarCard from "~/src/modules/analytics/components/cards/base/BarCard.vue";
    import {onMounted, type Ref} from "vue";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import type {APIResponse} from "~/api/utils/HonoResponses";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";

    const bars: Ref<{ name: string, percentage: number, value?: string }[]> = ref([]);


    const analyticsFilterState = useAnalyticFilterState();
    watch(() => useAnalyticFilterState().actions, async () => {
            await getData();
        }
    );

    async function getData() {
        const accountState = useAccountStore();
        const request: APIResponse = await $fetch(`/API/creator_api/statistics/${accountState.brand?.id}/gender_ages`);
        if (!request.success) return;

        for (const [key, item] of Object.entries(request.data)) {
            bars.value.push(
                {
                    name: key,
                    percentage: Math.round(item),
                    // value: `${item.value}%`
                }
            );
        }
    }

    onMounted(async () => {
        await getData();
    });
</script>

<template>
    <BarCard v-if="bars.length > 0" title="Ages by gender" :stats="
        bars"
    ></BarCard>
</template>