<script setup lang='ts'>

    import BarCard from "~/src/modules/analytics/components/base/BarCard.vue";
    import {onMounted, type Ref} from "vue";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import type {APIResponse} from "~/api/utils/HonoResponses";

    const bars: Ref<{ name: string, percentage: number, value?: string }[]> = ref([]);

    onMounted(async () => {
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
    })
</script>

<template>
    <BarCard v-if="bars.length > 0" title="Ages by gender" :stats="
        bars"
    ></BarCard>
</template>