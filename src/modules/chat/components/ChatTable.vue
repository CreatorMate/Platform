<script setup lang='ts'>
    import {isUrl, shortenString} from "~/src/utils/utils";

    const {sections} = defineProps<{
        sections: {type:string, data: any}[]
    }>();


</script>

<template>
    <div class="flex flex-col gap-2">
        <div v-for="section of sections">
            <div v-if="section.type == 'text'">
                <p>{{section.data}}</p>
            </div>
            <div v-if="section.type == 'object'">
                <table class="w-[500px] text-left">
                    <tr class="bg-gray-200">
                        <th class="py-2 px-6">name</th>
                        <th>value</th>
                    </tr>
                    <tr v-for="(key, value) of Object.entries(section.data)">
                        <th class="py-2 px-6">{{key[0]}}</th>
                        <th>
                            <p v-if="!isUrl(key[1])">{{key[1]}}</p>
                            <img v-else :src="key[1]" class="w-24 h-24" alt="image found"/>
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    </div>

</template>

<style scoped>
</style>