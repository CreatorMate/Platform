<script setup lang='ts'>
    import {onMounted} from "vue";
    import {Icon} from "@iconify/vue";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import type {CreatorProfile, Post} from "~/src/utils/CreatorAPITypes";
    import AnalyticTopBar from "~/src/modules/analytics/components/AnalyticTopBar.vue";
    import {useAnalyticFilterState} from "~/src/modules/analytics/state/AnalyticFilterState";
    import {sendTo, shorten} from "~/src/utils/utils";
    import {useInfiniteScroll} from "@vueuse/core";
    import {useFrameState} from "~/src/utils/FrameState";
    import ContentCard from "~/src/modules/content/components/ContentCard.vue";
    import {API} from "~/src/utils/API/API";

    const posts = ref<Post[]>([]);
    const creators = ref<CreatorProfile[]>([]);
    const key = ref('views');
    const open = ref(false);
    const limit = ref(10);
    const page = ref(1);

    const selected = ref<CreatorProfile[]>([]);
    const analyticsFilterState = useAnalyticFilterState();
    const frameState = useFrameState();
    let moreContent = ref(true);


    onMounted(async () => {
        await new Promise((res) => setTimeout(res, 50));
        useInfiniteScroll(frameState.frameRef, async () => {
                if (moreContent.value) {
                    await getContent();
                }
            },
            {
                distance: 10,
                canLoadMore: () => {
                    return moreContent.value;
                }
            });
    });

    onUnmounted(() => {
        moreContent.value = false;
    });

    watch(() => analyticsFilterState.actions, async () => {
        await reset();
    });

    async function reset() {
        page.value = 1;
        moreContent.value = true;
        posts.value = [];
        await getContent();
    }

    async function getContent() {
        const postRequest: APIResponse<Post[]> = await API.ask(`/creator_api/brands/1/content?key=${analyticsFilterState.key}&ids=${analyticsFilterState.getIds()}&limit=${limit.value}&days=${analyticsFilterState.days}&page=${page.value}`)

        console.log(postRequest);

        if (!postRequest.success || postRequest.data.length === 0) {
            moreContent.value = false;
            return;
        }

        posts.value.push(...postRequest.data);
        page.value++;
    }

</script>

<template>
    <section class="flex flex-col w-full gap-4 text-black mb-3">
        <AnalyticTopBar title="content overview" :show-days="true"
                        sub-title="clear overview on all the active creator contnt you have going on"
                        :show-sort="true"/>
        <div class="grid grid-cols-2 gap-3 h-full ">
            <ContentCard :post="post" v-for="post of posts"/>
            <div class="devider h-3 w-3"></div>
        </div>
    </section>
</template>

