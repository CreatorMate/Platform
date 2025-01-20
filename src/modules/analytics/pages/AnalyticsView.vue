<script setup lang='ts'>
    import PostFieldAverageCard from "~/src/modules/analytics/components/cards/PostFieldAverageCard.vue";
    import TotalFollowersCard from "~/src/modules/analytics/components/cards/TotalFollowersCard.vue";
    import ContentTypesCard from "~/src/modules/analytics/components/cards/ContentTypesCard.vue";
    import GenderDistributionCard from "~/src/modules/analytics/components/cards/GenderDistributionCard.vue";
    import AgesCard from "~/src/modules/analytics/components/cards/AgesCard.vue";
    import CitiesCard from "~/src/modules/analytics/components/cards/CitiesCard.vue";
    import GenderAgesCard from "~/src/modules/analytics/components/cards/GenderAgesCard.vue";
    import CountryDistibutionCard from "~/src/modules/analytics/components/cards/CountryDistibutionCard.vue";
    import PageTitle from "~/src/components/Core/PageTitle.vue";
    import AnalyticTopBar from "~/src/modules/analytics/components/AnalyticTopBar.vue";
</script>

<template>
    <div class="w-full h-full flex flex-col">
        <AnalyticTopBar title="analytics" sub-title="clear overview on all the active creator analytics you have going on" :show-days="true" :show-sort="false"></AnalyticTopBar>
        <div class="w-full grid grid-cols-3 gap-5 text-black mb-6">
            <ContentTypesCard/>
            <GenderDistributionCard/>
            <AgesCard></AgesCard>
            <CitiesCard></CitiesCard>
            <CountryDistibutionCard/>
            <GenderAgesCard></GenderAgesCard>
            <PostFieldAverageCard field="likes" ids=""></PostFieldAverageCard>
            <PostFieldAverageCard field="engagement" ids="" marker="%"></PostFieldAverageCard>
            <PostFieldAverageCard field="comments" ids=""></PostFieldAverageCard>
            <PostFieldAverageCard field="reach" ids=""></PostFieldAverageCard>
            <PostFieldAverageCard field="saves" ids=""></PostFieldAverageCard>
            <PostFieldAverageCard field="shares" ids=""></PostFieldAverageCard>
            <TotalFollowersCard ids=""></TotalFollowersCard>
        </div>
    </div>
</template>