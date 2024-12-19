<script setup lang='ts'>
    import {onMounted} from "vue";
    import {useRouter} from "#app";
    import type {APIResponse} from "~/api/utils/HonoResponses";
    import type {Creator} from "~/src/utils/SupabaseTypes";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";

    const route = useRoute();
    const id = route.params.id;
    const data = ref<any>(null);
    const router = useRouter();
    const accountStore = useAccountStore();

    onMounted(async () => {
        try {
            const creator: APIResponse<Creator> = await $fetch(`/hono/creators/${id}`);
            console.log(creator)
            if(!creator.success || creator.data.status != 'acquired' || creator.data.brand_id != accountStore.brand?.id) {
                throw new Error('no creator with this id')
            }

            const result = await $fetch(`/hono/creator_api/creator/profile/${id}`);
            data.value = result;

        } catch (error) {
            await router.replace('/creators')
        }


    })
</script>

<template>
    <p>{{data}}</p>
</template>