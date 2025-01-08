<script setup lang='ts'>

    import StatCard from "~/components/Analytics/StatCard.vue";
    import PieChartCard from "~/components/Analytics/PieChartCard.vue";
    import BarCard from "~/components/Analytics/BarCard.vue";
    import CountryCard from "~/components/Analytics/CountryCard.vue";
</script>

<template>
    <div class="w-full h-full flex flex-col overflow-y-scroll">
        <div class="w-full grid grid-cols-3 gap-5 text-black mb-6">
            <PieChartCard :segments="[
            { color: '#EF4444', percent: 33, title: 'reel' },
            { color: '#3493ce', percent: 33, title: 'image' },
            { color: '#73268d', percent: 34, title: 'video' },
        ]" title='content types'></PieChartCard>
            <BarCard title="total comments of recent posts" :stats="
        [
            {name: 'post 1', percentage: 10, value: '1,5k'},
            {name: 'post 2', percentage: 15, value: '1,9k'},
            {name: 'post 3', percentage: 20, value: '2,1k'},
            {name: 'post 4', percentage: 5, value: '1,1k'},
            {name: 'post 5', percentage: 12, value: '1,6k'},
            {name: 'post 6', percentage: 15, value: '1,9k'},
            {name: 'post 7', percentage: 10, value: '1,5k'},
            {name: 'post 8', percentage: 15, value: '1,9k'},
            {name: 'post 9', percentage: 20, value: '2,1k'},
            {name: 'post 10', percentage: 5, value: '1,1k'},
            {name: 'post 11', percentage: 12, value: '1,6k'},
            {name: 'post 12', percentage: 15, value: '1,9k'},
           ]"
            ></BarCard>
            <BarCard title="total likes of recent posts" :stats="
        [
            {name: 'post 1', percentage: 10, value: '1,5k'},
            {name: 'post 2', percentage: 15, value: '1,9k'},
            {name: 'post 3', percentage: 20, value: '2,1k'},
            {name: 'post 4', percentage: 5, value: '1,1k'},
            {name: 'post 5', percentage: 12, value: '1,6k'},
            {name: 'post 6', percentage: 15, value: '1,9k'},
            {name: 'post 7', percentage: 10, value: '1,5k'},
            {name: 'post 8', percentage: 15, value: '1,9k'},
            {name: 'post 9', percentage: 20, value: '2,1k'},
            {name: 'post 10', percentage: 5, value: '1,1k'},
            {name: 'post 11', percentage: 12, value: '1,6k'},
            {name: 'post 12', percentage: 15, value: '1,9k'},
           ]"
            ></BarCard>
            <BarCard title="age" :stats="
        [
            {name: '12-16', percentage: 5},
            {name: '16-24', percentage: 20},
            {name: '24-32', percentage: 35},
            {name: '32-40', percentage: 15},
            {name: '40-50', percentage: 5},
            {name: '50+', percentage: 5},
           ]"
            ></BarCard>
            <stat-card title="all creators" :number="65" icon="solar:alt-arrow-down-line-duotone"></stat-card>
            <stat-card title="average reach" :number="80" icon="solar:alt-arrow-down-line-duotone"></stat-card>
        </div>
        <country-card></country-card>
    </div>
</template>