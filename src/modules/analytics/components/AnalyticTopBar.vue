<script setup lang='ts'>

    import PageTitle from "~/src/components/Core/PageTitle.vue";
    import {Icon} from "@iconify/vue";
    import type {Ref} from "vue";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";

    defineProps<{
        title: string,
        subTitle: string,
        showDays: boolean,
        showSort: boolean
    }>();

    let creators: Ref<string[]> = ref([]);
    let open = ref(false);

    let analyticFilterState = useAnalyticFilterState();

    onMounted(async () => {
        if(analyticFilterState.creators.length === 0) {
            await analyticFilterState.getCreators();
        }
    });

    watch(() => analyticFilterState.days, () => {
        analyticFilterState.actions++;
    });

    watch(() => analyticFilterState.key, () => {
        analyticFilterState.actions++;
    });

    function lastRefreshed() {
        const today = new Date();
        const last1AM = new Date(today);
        last1AM.setHours(1, 0, 0, 0);
        if (today.getHours() < 1) {
            last1AM.setDate(today.getDate() - 1);
        }
        const hours = String(last1AM.getHours()).padStart(2, '0');
        const minutes = String(last1AM.getMinutes()).padStart(2, '0');

        // Get the day and month
        const date = last1AM.getDate();
        const month = last1AM.toLocaleString('default', {month: 'short'}); // e.g., 'Dec'

        return `last refreshed at ${hours}:${minutes} ${date} ${month}`;
    }
</script>

<template>
    <div class="flex h-fit justify-between items-center w-full">
        <PageTitle :title :subTitle></PageTitle>
        <div class="flex gap-3">
            <button class="bg-background py-3 px-6 text-text-dark rounded-lg">export</button>
            <button class="bg-black py-3 px-6 text-white rounded-lg">action button</button>
        </div>
    </div>
    <div class="mt-14 flex justify-between gap-3">
        <div class="flex items-center gap-3">
            <Icon width="20" icon="material-symbols:cached"/>
            <p>last refreshed at {{lastRefreshed()}}</p>
        </div>
        <div @click="open = !open" class="flex flex-grow flex-col bg-white pt-0.5 relative">
            <input class="w-full outline-none border border-[#F5F5F5] py-1 px-3 cursor-pointer" placeholder="select your creators" />
            <div v-if="open" class="absolute top-10 border shadow w-full z-50 bg-white">
                <div @click="analyticFilterState.filterCreator(creator, true)" class="w-full pl-3 py-1 hover:bg-blue-600 hover:text-white" v-for="creator of analyticFilterState.creators">
                    <p v-if="!analyticFilterState.selectedCreators.includes(creator)">
                        {{creator.username}}
                    </p>
                </div>
            </div>
        </div>
        <div class="flex items-center gap-6">
            <div v-if="showSort" class="flex gap-3 items-center">
                <Icon width="20" icon="material-symbols:swap-vert"></Icon>
                <select v-model="analyticFilterState.key" class="py-1 px-3 bg-white border border-[#F5F5F5]">
                    <option value="">none</option>
                    <option value="likes">likes</option>
                    <option value="comments">comments</option>
                    <option value="engagement">engagement</option>
                    <option value="reach">reach</option>
                    <option value="saves">saves</option>
                    <option value="shares">shares</option>
                </select>
            </div>
            <div v-if="showDays" class="flex gap-3 items-center">
                <p class="text-black">last</p>
                <select v-model="analyticFilterState.days" class="py-1 px-3 bg-white border border-[#F5F5F5]">
                    <option :value="90">90 days</option>
                    <option :value="60">60 days</option>
                    <option :value="30">30 days</option>
                </select>
            </div>
        </div>
    </div>
    <div class="flex flex-wrap mb-14 gap-3 mt-3">
        <div @click="analyticFilterState.filterCreator(creator)" class="bg-gray-300 flex gap-1 items-center px-3 py-1 cursor-pointer" v-for="creator of analyticFilterState.selectedCreators">
            <p>{{creator.username}}</p>
            <Icon width="20" icon="material-symbols:close-small"></Icon>
        </div>
    </div>

</template>