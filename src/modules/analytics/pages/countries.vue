<script setup lang='ts'>
    import {onMounted} from "vue";
    import {Icon} from "@iconify/vue";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import type {CreatorProfile, Post} from "~/src/utils/CreatorAPITypes";
    import CountryCard from "~/src/modules/analytics/components/cards/CountryCard.vue";
    import AnalyticTopBar from "~/src/modules/analytics/components/AnalyticTopBar.vue";

    const posts = ref<Post[]>([]);
    const creators = ref<CreatorProfile[]>([]);
    const key = ref('views');
    const open = ref(false);
    const limit = ref(10);

    const selected = ref<CreatorProfile[]>([]);

    let countryData = ref({
    });

    onMounted(async () => {
        await getContent();
    });
    async function getContent() {
        const profiles: APIResponse<CreatorProfile[]> = await $fetch(`/API/creator_api/brands/1/profiles`);
        if(!profiles.success) return;

        creators.value = profiles.data;

        let ids = "";
        for (const creator of selected.value) {
            console.log(creator);
            ids += `${creator.id},`;
        }

        const countryDataRequest: APIResponse = await $fetch(`/API/creator_api/brands/1/countries?ids=${ids}`);
        if(countryDataRequest.success) {
            countryData.value = countryDataRequest.data;
        }
    }

    async function selectOrRemove(creator: CreatorProfile) {
        if(selected.value.includes(creator)) {
            selected.value = selected.value.filter((currentCreator) => currentCreator != creator);
        } else {
            selected.value.push(creator);
        }

        await getContent();
    }
</script>

<template>
    <section class="flex flex-col w-full gap-4">
        <AnalyticTopBar title="analytics" sub-title="clear overview on all the active creator analytics you have going on" :show-days="true" :show-sort="true"></AnalyticTopBar>
        <div class="flex flex-wrap gap-2">
            <div class="flex flex-col" style="width: 20%" v-for="item of posts">
                <img class="max-h-full object-cover" :src="item.thumbnail">
                <p>{{ item.title }}</p>
            </div>
        </div>

        <CountryCard :country-data="countryData"></CountryCard>
    </section>

</template>