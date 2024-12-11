<script setup lang="ts">
    import InvitationInsertName from "~/src/modules/invitation/components/InvitationInsertName.vue";
    import InvitationConnectIG from "~/src/modules/invitation/components/InvitationConnectIG.vue";

    const invitationStep = ref(2);
</script>

<template>
    <main class="screen-size bg-background flex justify-center items-center text-background-text">
        <InvitationInsertName v-if="invitationStep == 1"/>
        <InvitationConnectIG v-else />
    </main>
</template>