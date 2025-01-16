<script setup lang='ts'>
    import {onMounted} from "vue";
    import {Icon} from "@iconify/vue";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import type {CreatorProfile, Post} from "~/src/utils/CreatorAPITypes";
    import CountryCard from "~/src/modules/analytics/components/CountryCard.vue";

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
        <div>
            <div @click="open = !open" class="w-full border border-black border-opacity-20 shadow-input px-6 py-3 flex justify-between items-center">
                <div class="flex gap-2">
                    <div v-for="profile of selected">
                        <p class="px-2 py-1 bg-blue-200">{{profile.username}}</p>
                    </div>
                </div>
                <Icon icon="mdi:keyboard-arrow-down"></Icon>
            </div>
            <div v-if="open" class="border border-black border-opacity-20 cursor-pointer flex flex-col gap-1">
                <div @click="selectOrRemove(creator)" class="px-3 py-2" v-for="creator of creators">
                    <p :class="{
                        'bg-blue-300': selected.includes(creator)
                    }">{{creator.username}}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap gap-2">
            <div class="flex flex-col" style="width: 20%" v-for="item of posts">
                <img class="max-h-full object-cover" :src="item.thumbnail">
                <p>{{ item.title }}</p>
            </div>
        </div>

        <CountryCard :country-data="countryData"></CountryCard>
    </section>

</template>