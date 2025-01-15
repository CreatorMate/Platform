<script setup lang='ts'>
    import AnalyticCard from "~/src/modules/analytics/components/base/AnalyticCard.vue";
    import {onMounted} from "vue";
    import type {APIResponse} from "~/api/utils/HonoResponses";
    import CountryMap from "~/src/modules/analytics/components/base/CountryMap.vue";

    let props = defineProps<{
        countryData: { [key: string]: number }
    }>();

    const {countryData} = toRefs(props);

    function getTop10Highest(): {rank: number, code: string, value: number}[] {
        if(!countryData) return [];
        // Convert the object into an array of [key, value] pairs
        const entries = Object.entries(countryData.value);

        // Sort the entries by value in descending order
        entries.sort((a, b) => b[1] - a[1]);

        // Take the top 10 entries and format them
        const top10 = entries.slice(0, 10).map((entry, index) => ({
            rank: index + 1,
            code: entry[0],
            value: entry[1]
        }));

        return top10;
    }

</script>


<template>
    <ClientOnly>
        <AnalyticCard v-if="countryData" class="" title="countries">
            <div class="h-full flex">
                <div class="w-1/2">
                    <CountryMap class="pb-10" :countryData="countryData"
                                highColor="#000"
                                lowColor="#aaaaaa"
                                countryStrokeColor="#909090"
                                defaultCountryFillColor="#dadada"></CountryMap>
                </div>
                <div class="w-1/2 flex flex-col px-20 justify-center">
                                    <div class="w-full justify-between flex items-center" v-for="country of getTop10Highest()">
                                        <div class="flex items-center gap-2">
                                            <p>{{country.rank}}.</p>
                                            <p>{{country.code}}</p>
                                        </div>
                                        <p>{{country.value}}</p>
                                    </div>
                </div>
            </div>
        </AnalyticCard>
    </ClientOnly>
</template>