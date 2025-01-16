<script setup lang='ts'>

    import BarCard from "~/src/modules/analytics/components/base/BarCard.vue";
    import {onMounted, type Ref} from "vue";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import type {APIResponse} from "~/api/utils/HonoResponses";

    const bars: Ref<{ name: string, percentage: number, value?: string }[]> = ref([]);

    onMounted(async () => {
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
    })
</script>

<template>
    <BarCard v-if="bars.length > 0" title="Cities" :stats="
        bars"
    ></BarCard>
</template>