<script setup lang='ts'>
    import {Icon} from "@iconify/vue";
    import {useRoute} from "#imports";
    import type {PhylloConnection} from "~/src/utils/Phyllo/PhylloConnection";
    import type {Ref} from "vue";
    import type {APIResponse} from "~/api/utils/HonoResponses";

    const route = useRoute();
    const creatorId = route.params.user_id;
    const brandId = route.params.brand_id;

    const connection: Ref<PhylloConnection|null> = ref(null);
    let connector: any = null;

    const success = ref(false);

    onMounted(async () => {
        if(!creatorId || !brandId) return;
        const response: APIResponse = await $fetch( `/API/phyllo?creatorId=${creatorId}&brandId=${brandId}`);

        if(!response.success) return;

        connection.value = response.data;
        if(!connection.value) return;

        const config: PhylloConfig = {
            clientDisplayName: 'creator mate',
            environment: 'staging',
            userId: connection.value.user_id,
            token: connection.value.token,
            redirect: false,
            workPlatformId: '9bb8913b-ddd9-430b-a66a-d74d846e6c66',
            'redirect URL': 'http://localhost:3000',
        };

        const phylloConnect = PhylloConnect.initialize(config);

        phylloConnect.on("accountConnected", async (accountId: any, workplatformId: any, userId: any) => {  // gives the successfully connected account ID and work platform ID for the given user ID
            const result: APIResponse = await $fetch(`http://localhost:3000/API/creators/${userId}/accounts`, {
                method: 'POST',
                body: JSON.stringify({
                    accountId: accountId,
                    platformId: workplatformId
                })
            });

            if(!result.success) return;

            const updateStats: APIResponse = await $fetch(`/API/creators/${creatorId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    status: 'acquired',
                }),
            });

            success.value = true;
            /* @todo
                1. Add account data to the connected_accounts table.
                2. Redirect user to a thanks for filling in this invitation, let them know they can always return to this page to alter the connection.
                3. Send request to backend server to scrape that user.
             */
        });
        phylloConnect.on("accountDisconnected", async (accountId: any, workplatformId: any, userId: any) => {  // gives the successfully disconnected account ID and work platform ID for the given user ID
            const result: APIResponse = await $fetch(`http://localhost:3000/API/creators/${userId}/accounts/${accountId}`, {
                method: 'DELETE'
            });
            /* @todo
                1. Delete account data to the connected_accounts table
                2. Send request to backend to remove that account from the cache.
             */
        });
        phylloConnect.on("tokenExpired", (userId: any) => {});
        phylloConnect.on("exit", (reason: any, userId: any) => {});
        phylloConnect.on("connectionFailure", (reason: any, workplatformId: any, userId: any) => {});

        connector = phylloConnect;
    });
</script>

<template>
    <div class="flex items-center flex-col w-[750px] border border-black border-opacity-10 rounded-3xl">
        <NuxtImg class="w-[54px] mt-24 mb-8" src="/logo.png"></NuxtImg>
        <h1 class="text-text-dark font-semibold text-3xl text-center mb-6">joyful and efficient <br/> collaboration.
            <span class="text-[#FFACAC]">all in one.</span></h1>
        <button v-if="!success" @click="connector.open()" class="bg-black text-white rounded-xl py-4 px-24 flex items-center gap-2.5">
            <Icon icon="mdi:instagram"/>
            Connect your instagram
        </button>
        <p v-else>You completed every step thanks for accepting the invite!</p>
        <p class="mt-6 pb-14 text-xs text-[#AFAFAF] w-full text-center border-b border-black border-opacity-10">By
            clicking "Continue with Instagram". you acknowledge that you have read,<br/> understood and agree to
            creatormate's <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Terms & Conditions</a>
            and privacy policy</p>
        <p class="mt-9 text-text-dark font-semibold mb-5">join 2,000+ creators & brands</p>
        <div class="pb-10 flex relative">
            <div class="left-1/2 w-9 h-9 bg-gray-300 rounded-full -ml-3 first:ml-0 border border-white"
                 v-for="i of 11"></div>
        </div>
    </div>
</template>