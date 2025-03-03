<script setup lang='ts'>
    import {getSupabaseClient} from "~/src/utils/Supabase/SupabaseClient";
    import {onMounted} from "vue";
    import {API} from "~/src/utils/API/API";
    import {useAccountState} from "~/src/utils/Auth/AccountState";

    const {user} = useOidcAuth();
    const accountState = useAccountState();

    onMounted(() => {
        if (!accountState.user) return;
    });

    async function syncBrand() {
        await API.ask(`/creator_api/sync/instagram?brandId=brand_id`);
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
                    <button @click="syncBrand" class="py-2 px-12 bg-black rounded-lg text-white">Request sync</button>
                </div>
            </div>
        </div>
        <div v-else class="w-full py-3 border-b border-gray-500 border-opacity-10 flex flex-col justify-center gap-3 mt-6">
            <div class="flex items-center w-full gap-12">
                <div class="flex flex-col">
                    <p class="text-text-normal font-semibold">Instagram: @creatormate connected</p>
                    <p class="font-semibold text-sm">This account will be used in calculations using your brand</p>
                </div>
                <div>
                    <button @click="syncBrand" class="py-2 px-12 bg-black rounded-lg text-white">Disconnect</button>
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