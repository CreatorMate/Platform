<script setup lang='ts'>
    import PostFieldAverageCard from "~/src/modules/analytics/components/PostFieldAverageCard.vue";
    import TotalFollowersCard from "~/src/modules/analytics/components/TotalFollowersCard.vue";
    import ContentTypesCard from "~/src/modules/analytics/components/ContentTypesCard.vue";
    import GenderDistributionCard from "~/src/modules/analytics/components/GenderDistributionCard.vue";
    import AgesCard from "~/src/modules/analytics/components/AgesCard.vue";
    import CitiesCard from "~/src/modules/analytics/components/CitiesCard.vue";
    import GenderAgesCard from "~/src/modules/analytics/components/GenderAgesCard.vue";
    import CountryDistibutionCard from "~/src/modules/analytics/components/CountryDistibutionCard.vue";
</script>

<template>
    <div class="w-full h-full flex flex-col overflow-y-scroll">
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