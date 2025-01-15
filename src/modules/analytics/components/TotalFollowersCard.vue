<script setup lang='ts'>
    import StatCard from "~/src/modules/analytics/components/base/StatCard.vue";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import type {APIResponse} from "~/api/utils/HonoResponses";

    const {ids} = defineProps<{
        ids: string
    }>();

    const value = ref(0);

    onMounted(async () => {
        const accountStore = useAccountStore();
        const requestAverage: APIResponse<number> = await $fetch(`/hono/creator_api/statistics/${accountStore.brand?.id}/followers?ids=${ids ?? ''}`)
        if(!requestAverage.success) return;

        value.value = requestAverage.data;
    });


</script>

<template>
    <stat-card :title="`total followers`" :number="value" icon="solar:alt-arrow-down-line-duotone"></stat-card>
</template>