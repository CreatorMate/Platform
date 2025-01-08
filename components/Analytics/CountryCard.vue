<script setup lang='ts'>
    import AnalyticCard from "~/components/Analytics/AnalyticCard.vue";
    import CountryMap from "~/components/Analytics/CountryMap.vue";

    const countryData = {
        'LK': 1.08, 'NL': 8.04, 'TR': 2.28, 'RO': 0.54, 'PL': 1.03, 'PK': 3.03,
        'TN': 1.39, 'NG': 1.65, 'PH': 1, 'VN': 0.59, 'CZ': 0.49, 'PE': 0.78,
        'AU': 1.57, 'TH': 0.94, 'AR': 1.33, 'KZ': 0.54, 'ES': 2.51, 'MY': 1.27,
        'CO': 0.81, 'IT': 2.08, 'MX': 1.79, 'IR': 1.74, 'CL': 0.52, 'ZA': 2.04,
        'KR': 0.51, 'IN': 23.26, 'CH': 0.7, 'AE': 1.08, 'EG': 1.78, 'US': 5.94,
        'CA': 1.67, 'ID': 3.15, 'GB': 3.09, 'KE': 0.8, 'DZ': 1.17, 'MA': 2.99,
        'BR': 4.81, 'SA': 0.58, 'FR': 1.54, 'DK': 0.51, 'PT': 0.84, 'RU': 1.39,
        'BE': 0.82, 'BD': 0.8, 'DE': 3.58, 'AT': 0.5
    }

    function getTop10Highest(data: Object): {rank: number, code: string, value: number}[] {
        // Convert the object into an array of [key, value] pairs
        const entries = Object.entries(data);

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

    const top10Countries: {rank: number, code: string, value: number}[] = getTop10Highest(countryData);

</script>


<template>
    <AnalyticCard class="" title="countries">
        <div class="h-full flex">
            <div class="w-1/2">
                <CountryMap class="pb-10" :countryData="countryData"
                            highColor="#000"
                            lowColor="#aaaaaa"
                            countryStrokeColor="#909090"
                            defaultCountryFillColor="#dadada"></CountryMap>
            </div>
            <div class="w-1/2 flex flex-col px-20 justify-center">
                <div class="w-full justify-between flex items-center" v-for="country of top10Countries">
                    <div class="flex items-center gap-2">
                        <p>{{country.rank}}.</p>
                        <p>{{country.code}}</p>
                    </div>
                    <p>{{country.value}}</p>
                </div>
            </div>
        </div>

    </AnalyticCard>
</template>