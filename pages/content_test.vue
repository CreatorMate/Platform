<script setup lang='ts'>
    import {onMounted} from "vue";

    const posts = ref<any>(null);
    const key = ref('views');

    onMounted(async () => {
        await getContent()
    });

    async function getContent() {
        posts.value = await $fetch(`/hono/creator_api/brands/1/content?key=${key.value}`);
    }
</script>

<template>
    <section v-if="posts" class="flex flex-col">
        <select v-model="key" @change="getContent" class="border mb-2">
            <option value="views">views</option>
            <option value="comments">comments</option>
            <option value="shares">shares</option>
            <option value="likes">likes</option>
        </select>
        <div class="flex flex-wrap gap-2">
            <div class="flex flex-col" style="width: 20%" v-for="item of posts.data">
                <img class="max-h-full object-cover" :src="item.thumbnail">
                <p>{{item.title}}</p>
            </div>
        </div>


    </section>

</template>