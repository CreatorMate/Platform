<script setup lang='ts'>
    import {onMounted} from "vue";
    import {Icon} from "@iconify/vue";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import type {CreatorProfile, Post} from "~/src/utils/CreatorAPITypes";
    import CountryCard from "~/src/modules/analytics/components/cards/CountryCard.vue";
    import AnalyticTopBar from "~/src/modules/analytics/components/AnalyticTopBar.vue";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";

    const posts = ref<Post[]>([]);

    let countryData = ref({
    });

    onMounted(async () => {
        await getContent();
    });

    const analyticFilterState = useAnalyticFilterState();

    watch(() => analyticFilterState.actions, async () => {
            await getContent();
        }
    );
    async function getContent() {
        const countryDataRequest: APIResponse = await $fetch(`/API/creator_api/brands/1/countries?ids=${analyticFilterState.getIds()}`);
        if(countryDataRequest.success) {
            countryData.value = countryDataRequest.data;
        }
    }
</script>

<template>
    <section class="flex flex-col w-full gap-2">
        <AnalyticTopBar title="countries" sub-title="clear overview of your viewership across the globe" :show-days="false" :show-sort="false"></AnalyticTopBar>
        <div class="flex flex-wrap gap-2">
            <div class="flex flex-col" style="width: 20%" v-for="item of posts">
                <img class="max-h-full object-cover" :src="item.thumbnail">
                <p>{{ item.title }}</p>
            </div>
        </div>

        <CountryCard :country-data="countryData"></CountryCard>
    </section>

</template>