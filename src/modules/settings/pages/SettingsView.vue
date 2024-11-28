<script setup lang='ts'>

import PageTitle from "~/components/Core/PageTitle.vue";
import SettingTabs from "~/src/modules/settings/components/SettingTabs.vue";
import GeneralSettings from "~/src/modules/settings/components/GeneralSettings.vue";
</script>

<template>
    <section class="flex flex-col flex-grow">
        <PageTitle title="Settings"></PageTitle>
        <SettingTabs />
        <GeneralSettings />
    </section>

</template>