<script setup lang='ts'>
    import {API} from "~/src/utils/API/API";
    import type {ProjectWidget} from "~/src/utils/SupabaseTypes";
    import type {Project} from "~/src/utils/SupabaseTypes"

    const {value, project, widget} = defineProps<{
        widget: ProjectWidget,
        project: Project
        value: string
    }>();

    const valueRef = ref(value);

    async function update() {
        await API.ask(`/projects/${project.id}/widgets/${widget.id}`, 'PUT', {
            value: valueRef.value
        });
    }
</script>

<template>
    <textarea placeholder="empty text" @focusout="update" class="outline-gray-200 w-full h-full flex items-center text-gray-400" v-model="valueRef"></textarea>
</template>