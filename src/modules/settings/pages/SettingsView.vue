<script setup lang='ts'>
    import PageTitle from "~/src/components/Core/PageTitle.vue";
    import SettingTabs from "~/src/modules/settings/components/SettingTabs.vue";
    import GeneralSettings from "~/src/modules/settings/components/GeneralSettings.vue";
    import {API} from "~/src/utils/API/API";
    import BrandSettings from "~/src/modules/settings/components/BrandSettings.vue";

    async function syncCreators() {
        await API.ask('/creator_api/sync/instagram');
    }

    const setting = ref('General');
</script>

<template>
    <section class="flex flex-col flex-grow">
        <PageTitle title="Settings"></PageTitle>
        <SettingTabs v-model="setting"/>
        <GeneralSettings v-if="setting == 'General'"/>
        <BrandSettings v-else-if="setting == 'Brand'"/>
        <div class="mt-6 px-6" v-else>
            <p>settings not yet implemented</p>
        </div>
        <button @click="syncCreators" class="w-full bg-black py-3 rounded-lg text-white mt-auto">sync data</button>
    </section>
</template>