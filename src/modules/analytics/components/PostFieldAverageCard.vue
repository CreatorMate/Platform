<script setup lang='ts'>
    import StatCard from "~/src/modules/analytics/components/base/StatCard.vue";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import type {APIResponse} from "~/api/utils/HonoResponses";

    const {ids, field} = defineProps<{
        ids: string, field: string, marker?: string
    }>();

    const value = ref(0);

    onMounted(async () => {
        const accountStore = useAccountStore();
        const requestAverage: APIResponse<{average: number}> = await $fetch(`/API/creator_api/statistics/${accountStore.brand?.id}/average?key=${field}&ids=${ids ?? ''}`)
        if(!requestAverage.success) return;

        value.value = requestAverage.data.average;
    });


</script>

<template>
    <stat-card :title="`average ${field}`" :number="value" icon="solar:alt-arrow-down-line-duotone" :marker></stat-card>
</template>