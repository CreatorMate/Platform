<script setup lang='ts'>
    import {isUrl, shortenString} from "~/src/utils/utils";

    const {text} = defineProps<{
        text: string
    }>();

    const data: any = JSON.parse(text);
    console.log(data);

</script>

<template>
    <table class="w-[500px] text-left">
        <tr class="bg-gray-200">
            <th class="py-2 px-6">name</th>
            <th>value</th>
        </tr>
        <tr v-for="(key, value) of Object.entries(data)">
            <th class="py-2 px-6">{{key[0]}}</th>
            <th>
                <p v-if="!isUrl(key[1])">{{key[1]}}</p>
                <img v-else :src="key[1]" class="w-24 h-24" alt="image found"/>
            </th>
        </tr>
    </table>
</template>

<style scoped>
</style>