<script setup lang='ts'>
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import InvitationConnectIG from "~/src/modules/creators/components/InvitationConnectIG.vue";

    let checked = ref(false);
    let accepted = ref(false);

    let creatorId = ref('');
    let creatorEmail = ref('');

    const router = useRouter();
    const supabase = useSupabaseClient();

    onBeforeMount(async () => {
        const session = await supabase.auth.getSession();
        if(!session.data.session) {
            await router.replace('/creators/login');
            return;
        }
        creatorId.value = session.data.session?.user.id;
        creatorEmail.value = session.data.session?.user.email as string;

        const response: APIResponse = await $fetch(`/API/creators/${creatorEmail.value}`);
        if(!response.success) {
            await router.replace('/creators');
            return;
        }

        if(response.data.waitlist_id) {
            await router.replace('/creators/permissions');
            return;
        }
    });
</script>

<template>
    <section v-if="!accepted" class="box flex gap-12">
        <div>
            <NuxtImg class="w-[64px] h-[28px] mb-6" alt="creatormate logo" src="/logo-light.svg" />
            <p class="text-2xl font-medium mb-3">welcome to creatormate!</p>
            <p class="text-xl mb-3">let's learn about us, how it will work.</p>

            <div class="flex items-center gap-1 text-[#5E5E5E] text-sm mb-4">
                <input v-model="checked" type="checkbox">
                <p>i agree that i have read and accepted the terms <br/> and conditions, as well as the privacy policy of creatormate</p>
            </div>
            <button @click="accepted = true" class="w-full p-3 bg-black rounded-lg disabled:bg-gray-400 text-white" :disabled="!checked">continue</button>
        </div>
        <video src="/videos/welcome.mp4" class=" w-96" controls></video>
    </section>
    <InvitationConnectIG v-else-if="creatorId && creatorEmail" :creator-id="creatorId" :creator-mail="creatorEmail"/>
</template>