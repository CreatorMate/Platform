<script setup lang='ts'>
    import {onMounted} from "vue";
    import {Icon} from "@iconify/vue";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import type {CreatorProfile, Post} from "~/src/utils/CreatorAPITypes";
    import AnalyticTopBar from "~/src/modules/analytics/components/AnalyticTopBar.vue";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";
    import {shorten} from "../../../utils/utils";

    const posts = ref<Post[]>([]);
    const creators = ref<CreatorProfile[]>([]);
    const key = ref('views');
    const open = ref(false);
    const limit = ref(10);

    const selected = ref<CreatorProfile[]>([]);
    const analyticsFilterState = useAnalyticFilterState();

    onMounted(async () => {
        await getContent();
    });

    watch(() => analyticsFilterState.actions, async () => {
        await getContent();
    });

    async function getContent() {
        const postRequest: APIResponse<Post[]> = await $fetch(`/API/creator_api/brands/1/content?key=${analyticsFilterState.key}&ids=${analyticsFilterState.getIds()}&limit=${limit.value}&days=${analyticsFilterState.days}`);
        console.log(postRequest);
        if(!postRequest.success) return;

        posts.value = postRequest.data;
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
        <AnalyticTopBar title="content overview" :show-days="true" sub-title="clear overview on all the active creator contnt you have going on" :show-sort="true"/>
        <div class="grid grid-cols-2 gap-3">
            <div class="flex w-full min-w-full border border-[#E2E2E2] p-3" style="width: 20%" v-for="item of posts">
                <img :alt="item.posted_by + ' - ' + item.title" class="object-cover thumbnail" :src="item.persistent_thumbnail">
                <div class="h-full w-full flex justify-between">
                    <div>
                        <p class="">{{shorten(item.title, 5)}}</p>
                    </div>
                    <div>
                        <p>{{item.reach}}</p>
                    </div>
                </div>

            </div>
        </div>
    </section>

</template>

<style scoped>
.thumbnail {
    @apply min-w-[133px] min-h-[177px] w-[133px] h-[177px] max-w-[133px] max-h-[177px]
}
</style>