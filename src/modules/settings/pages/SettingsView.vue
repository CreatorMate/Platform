<script setup lang='ts'>
    import PageTitle from "~/src/components/Core/PageTitle.vue";
    import SettingTabs from "~/src/modules/settings/components/SettingTabs.vue";
    import GeneralSettings from "~/src/modules/settings/components/GeneralSettings.vue";
    import {API} from "~/src/utils/API/API";

    async function syncCreators() {
        await API.ask('/creator_api/sync/instagram');
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