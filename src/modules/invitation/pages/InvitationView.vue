<script setup lang="ts">
    import InvitationInsertName from "~/src/modules/invitation/components/InvitationInsertName.vue";
    import InvitationConnectIG from "~/src/modules/invitation/components/InvitationConnectIG.vue";
    import {onMounted} from "vue";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {appSettings} from "~/src/GlobalSettings";
    const invitationStep = ref(1);

    const route = useRoute();
    const brandId = route.params.brand_id;
    const userId = route.params.user_id;

    const user = ref<any>(null);

    const error = ref(false);
    const expired = ref(false);

    onMounted(async () => {
        const response: APIResponse = await $fetch(`${appSettings.baseUrl}/API/creators/${userId}`);
        if(!response.success) {
            error.value = true;
            return;
        };

        if(response.data.status != 'pending') {
            expired.value = true;
            return;
        }

        if(response.data.username) {
            invitationStep.value = 2;
        }
    });
</script>

<template>
    <p class="text-red-500 w-full h-full text-center" v-if="error">Invalid invite</p>
    <p class="text-red-500 w-full h-full text-center" v-else-if="expired">invite expired</p>
    <main v-else class="screen-size bg-background flex justify-center items-center text-background-text">
        <InvitationInsertName @next="invitationStep++" v-if="invitationStep == 1"/>
        <InvitationConnectIG v-else />
    </main>
</template>