<script setup lang='ts'>
    import PageTitle from "~/src/components/Core/PageTitle.vue";
    import SettingTabs from "~/src/modules/settings/components/SettingTabs.vue";
    import GeneralSettings from "~/src/modules/settings/components/GeneralSettings.vue";

    async function syncCreators() {
        await $fetch('/API/creator_api/sync/instagram')
    }
</script>

<template>
    <section class="flex flex-col flex-grow">
        <PageTitle title="Settings"></PageTitle>
        <SettingTabs/>
        <GeneralSettings/>
        <button @click="syncCreators" class="w-full bg-black py-3 rounded-lg text-white mt-auto">sync data</button>
    </section>

</template>