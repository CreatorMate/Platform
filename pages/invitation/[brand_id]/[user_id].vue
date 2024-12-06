<script setup lang="ts">
    import {useRoute} from '#imports';
    import InvitationView from "~/src/modules/invitation/pages/InvitationView.vue";

    definePageMeta({
        layout: 'empty'
    })
</script>

<template>
    <InvitationView/>
</template>
