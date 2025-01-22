<script setup lang='ts'>
    import {getSupabaseClient} from "~/src/utils/Supabase/SupabaseClient";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";

    definePageMeta({
        layout: 'empty'
    });

    const router = useRouter();
    const supabase = useSupabaseClient();
    const invited = ref(true);

    onBeforeMount(async () => {
        const session = await supabase.auth.getSession();
        if (!session.data.session) {
            await router.replace('/creators/login');
            return;
        }
        const email = session.data.session?.user.email;

        const response: APIResponse = await $fetch(`/API/creators/${email}`);
        if (!response.success) {
            invited.value = false;
            return;
        }

        if(!response.data.waitlist_id) {
            await router.replace('/creators/invited');
            return;
        }

        await router.replace('/creators/permissions');
    })


</script>

<template>
    <div class="screen-size flex justify-center items-center bg-white">
        <p v-if="!invited">you are not invited</p>
        <RouterView v-else></RouterView>
    </div>
</template>

<style scoped>
.box {
    @apply px-9 py-14;
    box-shadow: 0px 448px 125px 0px rgba(0, 0, 0, 0.00), 0px 286px 115px 0px rgba(0, 0, 0, 0.01), 0px 161px 97px 0px rgba(189, 189, 189, 0.05), 0px 72px 72px 0px rgba(110, 110, 110, 0.09), 0px 18px 39px 0px rgba(112, 112, 112, 0.10);
}
</style>