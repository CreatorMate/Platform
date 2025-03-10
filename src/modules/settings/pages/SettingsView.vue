<script setup lang='ts'>
    import PageTitle from "~/src/components/Core/PageTitle.vue";
    import SettingTabs from "~/src/modules/settings/components/SettingTabs.vue";
    import GeneralSettings from "~/src/modules/settings/components/GeneralSettings.vue";
    import {API} from "~/src/utils/API/API";
    import BrandSettings from "~/src/modules/settings/components/BrandSettings.vue";
    import {useAccountState} from "~/src/utils/Auth/AccountState";

    const accountState = useAccountState();

    const setting = ref('General');

    onMounted(() => {
        if(!accountState.brand) return;

        if(!accountState.brand.is_premium) {
            setting.value = 'Brand'
        }
    });

    async function syncCreators() {
        await API.ask('/creator_api/sync/instagram');
    }


</script>

<template>
    <section class="flex flex-col flex-grow">
        <PageTitle v-if="accountState.brand.is_premium" title="Settings"></PageTitle>
        <PageTitle v-else title="Brand settings"></PageTitle>
        <SettingTabs v-if="accountState.brand?.is_premium" v-model="setting"/>
        <GeneralSettings v-if="setting == 'General'"/>
        <BrandSettings v-else-if="setting == 'Brand'"/>
        <div class="mt-6 px-6" v-else>
            <p>settings not yet implemented</p>
        </div>
        <button v-if="accountState.brand?.is_premium" @click="syncCreators" class="w-full bg-black py-3 rounded-lg text-white mt-auto">sync data</button>
    </section>
</template>