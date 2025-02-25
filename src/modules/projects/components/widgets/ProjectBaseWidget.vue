<script setup lang='ts'>
    import type {ProjectWidget, Widget} from "~/src/utils/SupabaseTypes";
    import {WidgetProvider} from "~/src/modules/projects/data/WidgetProvider";
    import {Icon} from "@iconify/vue";
    import Dropdown from "~/src/components/Dropdown/Dropdown.vue";
    import {API} from "~/src/utils/API/API";
    import type {Project} from "~/src/utils/SupabaseTypes"

    const {widget, project} = defineProps<{
        widget: ProjectWidget,
        project: Project
    }>();

    const emits = defineEmits(['reload']);

    const open = ref(false);

    async function removeWidget() {
        await API.ask(`/projects/${project.id}/widgets/${widget.id}`, 'DELETE');
        emits("reload");
    }
</script>

<template>
    <div class="w-full h-full relative">
        <Icon @click="open = !open" class="cursor-pointer absolute right-3 top-3" icon="charm:menu-meatball"></Icon>
        <Dropdown class=" dropdown" @close="open = false" :open>
            <div class="flex flex-col w-56 items-start rounded-xl shadow">
                <button @click="removeWidget" class="px-3 py-2 hover:bg-blue-100 w-full text-left">Edit widget</button>
                <button @click="removeWidget" class="px-3 py-2 hover:bg-blue-100 w-full text-left">Delete</button>
            </div>
        </Dropdown>
        <component v-if="widget.widgets" :number="Math.round(Math.random() * 100)" :description="widget.widgets.description"
                   :title="widget.widgets.name" :is="WidgetProvider.getComponent(widget.widgets.component)?.component"/>
        <component v-else :widget :project :value="widget.value" :is="WidgetProvider.getComponent(widget.component, true)?.component"/>
    </div>
</template>

<style scoped>
.dropdown {
    top: 30px;
    right: 10px;
}
</style>