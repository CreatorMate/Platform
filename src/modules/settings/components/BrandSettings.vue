<script setup lang='ts'>
    import {getSupabaseClient} from "~/src/utils/Supabase/SupabaseClient";
    import {onMounted} from "vue";
    import {API} from "~/src/utils/API/API";
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import {useRuntimeConfig} from "#imports";

    const {user} = useOidcAuth();
    const accountState = useAccountState();

    const clientId = useRuntimeConfig().public.META_CLIENT_ID;
    const redirectURL = useRuntimeConfig().public.META_REDIRECT_URL;

    const brandData = ref<any>();

    onMounted(async () => {
        if (!accountState.user) return;

        if(accountState.instagramAccount) {
            const request = await API.ask('/creator_api/brands/brand_id/instagram');
            console.log(request)
            if(!request.success) return;
            brandData.value = request.data;
        }
    });
    function link() {
         }
    async function connectIg() {
        location.href = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${clientId}&redirect_uri=${redirectURL}&response_type=code&scope=instagram_business_basic,instagram_business_manage_insights`
    }

    async function disconnectIg() {
        const request = await API.ask(`/brands/ig`, 'DELETE');
        accountState.instagramAccount = null;
    }
</script>

<template>
    <div class="general-settings">
        <div v-if="!accountState.instagramAccount" class="w-full py-3 border-b border-gray-500 border-opacity-10 flex flex-col justify-center gap-3 mt-6">
            <div class="flex items-center w-full gap-12">
                <div class="flex flex-col">
                    <p class="text-text-normal font-semibold">Instagram not connected</p>
                    <p class="font-semibold text-sm">Request a data sync for your brand</p>
                </div>
                <div>
                    <button @click="connectIg" class="py-2 px-12 bg-black rounded-lg text-white">Connect</button>
                </div>
            </div>
        </div>
        <div v-else class="w-full py-3 border-b border-gray-500 border-opacity-10 flex flex-col justify-center gap-3 mt-6">
            <div class="flex items-center w-full gap-4">
                <div v-if="brandData">
                    <NuxtImg class="w-12 h-12 rounded-full" :src="brandData.profile_picture_url"></NuxtImg>
                </div>
                <div class="flex flex-col mr-8">
                    <p v-if="brandData" class="text-text-normal font-semibold">Instagram: @{{brandData.username}} connected</p>
                    <p class="font-semibold text-sm">This account will be used in calculations using your brand</p>
                </div>
                <div>
                    <button @click="disconnectIg" class="py-2 px-12 bg-black rounded-lg text-white">Disconnect</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.general-settings {
    animation: 1s fadeInUp;
}
</style>