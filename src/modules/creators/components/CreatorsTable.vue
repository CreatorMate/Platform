<script setup lang='ts'>
    import type {Creator} from "~/src/utils/SupabaseTypes";
    import CreatorTableRow from "~/src/modules/creators/components/CreatorTableRow.vue";

    const props = defineProps<{
        creators: Creator[]
    }>();

    const emits = defineEmits(['refresh'])

    const {creators} = toRefs(props);
</script>

<template>
    <table class="w-full text-left text-sm">
        <thead>
        <tr class="h-16 border-b border-black border-opacity-10 text-text-light">
            <th class="w-12">
                <div class="w-4 h-4 border"></div>
            </th>
            <th class="font-normal">handle</th>
            <th class="font-normal">status</th>
            <th class="font-normal">email address</th>
            <th class="font-normal">type</th>
            <th class="font-normal">start date</th>
            <th class="font-normal">country</th>
            <th class="font-normal"></th>
        </tr>
        </thead>
        <tbody>
        <CreatorTableRow @refresh="emits('refresh')" :creator v-for="creator of creators"/>
        </tbody>
    </table>
</template>