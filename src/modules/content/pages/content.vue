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

    const posts = ref<Post[]>([]);
    const creators = ref<CreatorProfile[]>([]);
    const key = ref('views');
    const open = ref(false);
    const limit = ref(10);
    const page = ref(1);

    const selected = ref<CreatorProfile[]>([]);
    const analyticsFilterState = useAnalyticFilterState();
    const frameState = useFrameState();
    let moreContent = true;

    const props = defineProps<{
        frameRef: HTMLDivElement|null
    }>();

    const {frameRef} = toRefs(props);

    onMounted(async () => {
        await new Promise((res) => setTimeout(res, 50));
        useInfiniteScroll(frameState.frameRef, async () => {
            await getContent();
        },
            {
                distance: 10,
                canLoadMore: () => {
                    console.log('checking');
                    return moreContent;
                }
            })
    });

    watch(() => analyticsFilterState.actions, async () => {
        await reset();
    });

    async function reset() {
        page.value = 1;
        moreContent = true;
        posts.value = [];
        await getContent();
    }

    async function getContent() {
        const postRequest: APIResponse<Post[]> = await $fetch(`/API/creator_api/brands/1/content?key=${analyticsFilterState.key}&ids=${analyticsFilterState.getIds()}&limit=${limit.value}&days=${analyticsFilterState.days}&page=${page.value}`);
        if(!postRequest.success || postRequest.data.length === 0) {
            moreContent = false;
            return;
        }

        posts.value.push(...postRequest.data);
        page.value++;
    }

    function onError(event: Event, post: Post) {
        const target = event.target as HTMLImageElement;
        if (target) {
            // target.src = post.user_picture;
        }

    }

</script>

<template>
    <section class="flex flex-col w-full gap-4 text-black mb-3">
        <AnalyticTopBar title="content overview" :show-days="true" sub-title="clear overview on all the active creator contnt you have going on" :show-sort="true"/>
        <div class="grid grid-cols-2 gap-3 h-full ">
            <div class="flex w-full min-w-full border border-[#E2E2E2] p-3 rounded-xl relative max-h-[200px]" style="width: 20%" v-for="item of posts">
                <NuxtImg @error="onError($event, item)" :alt="item.posted_by + ' - ' + item.title" class="object-cover thumbnail mr-3 rounded" :src="item.persistent_thumbnail" />
                <div class="h-full w-full flex justify-between">
                    <div class="h-full flex flex-col justify-between ">
                        <p class="text-xl w-[200px]">{{shorten(item.title, 5)}}</p>
                        <div class="flex flex-col gap-1">
                            <img :alt="`${item.posted_by}'s profile picture`" :src="item.user_picture" class="w-11 h-11 rounded-full" />
                            <NuxtLink target="_blank" :to="`https://instagram.com/${item.posted_by}`" class="font-medium cursor-pointer hover:underline">@{{item.posted_by}}</NuxtLink>
                        </div>
                    </div>
                    <div class="flex h-full items-center">
                        <div class=" h-full flex flex-col gap-1 pr-3">
                            <p class="font-medium">statistics</p>
<!--                            <p class="text-[#5E5E5E]">of the last 24 hrs</p>-->
                        </div>
                        <div class="h-16 bg-[#E2E2E2] w-[1px] mx-3"></div>
                        <div class="flex flex-col justify-between h-full">
                            <div class="flex flex-col">
                                <p class="text-xs">likes</p>
                                <p>{{item.likes}}</p>
                            </div>
                            <div class="flex flex-col">
                                <p class="text-xs">reach</p>
                                <p>{{item.reach}}</p>
                            </div>

                            <div class="flex flex-col">
                                <p class="text-xs">engagement</p>
                                <p>{{item.engagement}}%</p>
                            </div>
                        </div>
                        <div class="h-16 bg-[#E2E2E2] w-[1px] mx-3"></div>
                        <div class="flex flex-col justify-between h-full">
                            <div class="flex flex-col">
                                <p class="text-xs">comments</p>
                                <p>{{item.comments}}</p>
                            </div>
                            <div class="flex flex-col">
                                <p class="text-xs">reach rate</p>
                                <p>{{item.reach_rate}}%</p>
                            </div>
                            <div class="flex flex-col">
                                <p class="text-xs">active engagement</p>
                                <p>{{item.active_engagement}}%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Icon @click="sendTo(item.post_url)" class="absolute top-3 right-3 z-50 cursor-pointer hover:text-gray-800" icon="material-symbols:arrow-outward-rounded"></Icon>
            </div>
            <div class="devider h-3 w-3"></div>
        </div>

    </section>

</template>

<style scoped>
.thumbnail {
    @apply min-w-[133px] min-h-[177px] w-[133px] h-[177px] max-w-[133px] max-h-[177px]
}
</style>