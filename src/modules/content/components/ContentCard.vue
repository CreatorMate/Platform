<script setup lang='ts'>
    import type {Post} from "~/src/utils/CreatorAPITypes";
    import {sendTo, shorten} from "~/src/utils/utils";
    import {Icon} from "@iconify/vue";
    import {load} from "yaml-ast-parser";

    const {post} = defineProps<{
        post: Post
    }>()

    function onError(event: Event, post: Post) {
        const target = event.target as HTMLImageElement;
        if (target) {
            // target.src = post.user_picture;
        }
    }

    onMounted(() => {
        const blurDivs = document.querySelectorAll('.blur-load');
        blurDivs.forEach(div => {
            const img = div.querySelector("img")
            if (!img) return;

            function loaded() {
                if (!img) return;
                if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                    div.classList.add("loaded");
                }
            }

            if (img.complete) {
                loaded();
            } else {
                img.addEventListener("load", loaded);
            }
        })
    })

</script>

<template>
    <div class="flex w-full min-w-full border border-[#E2E2E2] p-3 rounded-xl relative max-h-[200px]"
         style="width: 20%">
        <div style="background-image: url('/placeholder.jpg')" class="blur-load thumbnail mr-3 rounded">
            <NuxtImg v-if="post.media_type === 'IMAGE'" @error="onError($event, post)"
                     :alt="post.posted_by + ' - ' + post.caption" class="object-cover rounded h-full w-full " :src="post.media_url" loading="lazy"/>
            <NuxtImg v-else @error="onError($event, post)" :alt="post.posted_by + ' - ' + post.caption"
                     class="object-cover rounded h-full w-full" :src="post.thumbnail_url" loading="lazy"/>
        </div>
        <div class="h-full w-full flex justify-between">
            <div class="h-full flex flex-col justify-between ">
                <p class="text-xl w-[200px]">{{post.caption ? shorten(post.caption, 5) : 'No title available' }}</p>
                <div class="flex flex-col gap-1">
                    <img :alt="`${post.posted_by}'s profile picture`" :src="post.user_picture"
                         class="w-11 h-11 rounded-full"/>
                    <NuxtLink target="_blank" :to="`https://instagram.com/${post.posted_by}`"
                              class="font-medium cursor-pointer hover:underline">@{{ post.posted_by }}
                    </NuxtLink>
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
                        <p>{{ post.likes }}</p>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-xs">reach</p>
                        <p>{{ post.reach }}</p>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-xs">engagement</p>
                        <p>{{ post.engagement }}%</p>
                    </div>
                </div>
                <div class="h-16 bg-[#E2E2E2] w-[1px] mx-3"></div>
                <div class="flex flex-col justify-between h-full">
                    <div class="flex flex-col">
                        <p class="text-xs">comments</p>
                        <p>{{ post.comments }}</p>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-xs">reach rate</p>
                        <p>{{ post.reach_rate }}%</p>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-xs">active engagement</p>
                        <p>{{ post.active_engagement }}%</p>
                    </div>
                </div>
            </div>
        </div>
        <Icon @click="sendTo(post.media_url)" class="absolute top-3 right-3 z-50 cursor-pointer hover:text-gray-800"
              icon="material-symbols:arrow-outward-rounded"></Icon>
    </div>
</template>

<style scoped>
.thumbnail {
    @apply min-w-[133px] min-h-[177px] w-[133px] h-[177px] max-w-[133px] max-h-[177px]
}

.blur-load {
    background-size: cover;
    background-position: center;
}

.blur-load.loaded > img {
    opacity: 1;
}

.blur-load > img {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
}
</style>