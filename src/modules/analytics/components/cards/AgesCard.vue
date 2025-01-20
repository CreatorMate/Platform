<script setup lang='ts'>

    import BarCard from "~/src/modules/analytics/components/cards/base/BarCard.vue";
    import {onMounted, type Ref} from "vue";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";

    const bars: Ref<{ name: string, percentage: number, value?: any }[]> = ref([]);
    const loading = ref(false);

    const analyticsFilterState = useAnalyticFilterState();
    watch(() => useAnalyticFilterState().actions, async () => {
            await getData();
        }
    );

    async function getData() {
        const accountState = useAccountStore();
        loading.value = true;
        const request: APIResponse<{
            key: string,
            value: number,

        }[]> = await $fetch(`/API/creator_api/statistics/${accountState.brand?.id}/age?ids=${analyticsFilterState.getIds()}&days=${analyticsFilterState.days}`);
        if (!request.success) return;

        bars.value = [];
        for (const item of request.data) {
            bars.value.push(
                {
                    name: item.key,
                    percentage: Math.round(item.value),
                    value: item.value + '%'
                }
            );
        }
        loading.value = false;
    }

    onMounted(async () => {
        await getData();
    })
</script>

<template>
    <BarCard class="card-3" v-if="bars.length > 0 && !loading" title="Ages" :stats="
        bars"
    ></BarCard>
</template>