<script setup lang='ts'>
    import {Icon} from "@iconify/vue";
    import {useRoute} from "#imports";
    import type {PhylloConnection} from "~/src/utils/Phyllo/PhylloConnection";
    import type {Ref} from "vue";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {appSettings} from "~/src/GlobalSettings";

    const route = useRoute();
    const props = defineProps<{
        creatorId: string, creatorMail: string
    }>();

    const {creatorId, creatorMail} = toRefs(props);

    const connection: Ref<PhylloConnection|null> = ref(null);
    let connector: any = null;

    const success = ref(false);

    onMounted(async () => {
        console.log(creatorMail)
        if(!creatorId) return;
        const response: APIResponse = await $fetch( `/API/phyllo?creatorId=${creatorId.value}&creatorEmail=${creatorMail.value}`);

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
            'redirect URL': `${appSettings.baseUrl}`,
        };

        const phylloConnect = PhylloConnect.initialize(config);

        phylloConnect.on("accountConnected", async (accountId: any, workplatformId: any, userId: any) => {  // gives the successfully connected account ID and work platform ID for the given user ID
            const result: APIResponse = await $fetch(`${appSettings.baseUrl}/API/creators/${userId}/accounts`, {
                method: 'POST',
                body: JSON.stringify({
                    accountId: accountId,
                    platformId: workplatformId
                })
            });

            if(!result.success) return;

            const updateStats: APIResponse = await $fetch(`/API/creators/${creatorId.value}`, {
                method: 'PUT',
                body: JSON.stringify({
                    status: 'acquired',
                    external_id: creatorId.value,
                    email: creatorMail.value
                }),
            });

            success.value = true;
        });
        phylloConnect.on("accountDisconnected", async (accountId: any, workplatformId: any, userId: any) => {  // gives the successfully disconnected account ID and work platform ID for the given user ID
            const result: APIResponse = await $fetch(`${appSettings.baseUrl}/API/creators/${userId}/accounts/${accountId}`, {
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
    <div class="flex items-center flex-col w-[750px] border-opacity-10 rounded-3xl box">
        <NuxtImg class="w-[54px] mb-8" src="/logo.png"></NuxtImg>
        <h1 class="text-text-dark font-semibold text-3xl text-center mb-6">joyful and efficient <br/> collaboration.
            <span class="text-[#FFACAC]">all in one.</span></h1>
        <button v-if="!success" @click="connector.open()" class="bg-black text-white rounded-xl py-4 px-24 flex items-center gap-2.5">
            <Icon icon="mdi:instagram"/>
            continue with instagram
        </button>
        <div v-else class="flex flex-col items-center">
            <p >You completed every step thanks for accepting the invite!</p>
            <NuxtLink class="underline text-center w-full" to="/creators" >Start your journey</NuxtLink>
        </div>

        <p class="mt-9 text-text-dark font-semibold mb-5">join 2,000+ creators & brands</p>
        <div class="flex relative">
            <div class="left-1/2 w-9 h-9 bg-gray-300 rounded-full -ml-3 first:ml-0 border border-white"
                 v-for="i of 11"></div>
        </div>
    </div>
</template>