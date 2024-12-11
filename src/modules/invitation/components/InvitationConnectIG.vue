<script setup lang='ts'>
    import {Icon} from "@iconify/vue";
    import {useRoute} from "#imports";
    import type {PhylloConnection} from "~/src/utils/Phyllo/PhylloConnection";
    import type {Ref} from "vue";

    const route = useRoute();
    const creatorId = route.params.user_id;
    const brandId = route.params.brand_id;

    const connection: Ref<PhylloConnection|null> = ref(null);
    let connector: any = null;

    onMounted(async () => {
        if(!creatorId || !brandId) return;
        connection.value = await $fetch( `/api/phyllo/getConnection?creatorId=${creatorId}&brandId=${brandId}`);

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

        phylloConnect.on("accountConnected", (accountId: any, workplatformId: any, userId: any) => {  // gives the successfully connected account ID and work platform ID for the given user ID
            console.log(`onAccountConnected: ${accountId}, ${workplatformId}, ${userId}`);

            /* @todo
                1. Add account data to the connected_accounts table.
                2. Redirect user to a thanks for filling in this invitation, let them know they can always return to this page to alter the connection.
                3. Send request to backend server to scrape that user.
             */
        });
        phylloConnect.on("accountDisconnected", (accountId: any, workplatformId: any, userId: any) => {  // gives the successfully disconnected account ID and work platform ID for the given user ID
            console.log(`onAccountDisconnected: ${accountId}, ${workplatformId}, ${userId}`);
            /* @todo
                1. Delete account data to the connected_accounts table
                2. Send request to backend to remove that account from the cache.
             */
        });
        phylloConnect.on("tokenExpired", (userId: any) => {  // gives the user ID for which the token has expired
            console.log(`onTokenExpired: ${userId}`);  // the SDK closes automatically in case the token has expired, and you need to handle this by showing an appropriate UI and messaging to the users
        });
        phylloConnect.on("exit", (reason: any, userId: any) => {  // indicates that the user with given user ID has closed the SDK and gives an appropriate reason for it
            console.log(`onExit: ${reason}, ${userId}`);
        });
        phylloConnect.on("connectionFailure", (reason: any, workplatformId: any, userId: any) => {  // optional, indicates that the user with given user ID has attempted connecting to the work platform but resulted in a failure and gives an appropriate reason for it
            //@todo handle the reason error.
            console.log(`onConnectionFailure: ${reason}, ${workplatformId}, ${userId}`);
        });

        connector = phylloConnect;
    });
</script>

<template>
    <div class="flex items-center flex-col w-[750px] border border-black border-opacity-10 rounded-3xl">
        <NuxtImg class="w-[54px] mt-24 mb-8" src="/logo.png"></NuxtImg>
        <h1 class="text-text-dark font-semibold text-3xl text-center mb-6">joyful and efficient <br/> collaboration.
            <span class="text-[#FFACAC]">all in one.</span></h1>
        <button @click="connector.open()" class="bg-black text-white rounded-xl py-4 px-24 flex items-center gap-2.5">
            <Icon icon="mdi:instagram"/>
            Connect your instagram
        </button>
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