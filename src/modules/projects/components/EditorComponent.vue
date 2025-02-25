<script setup lang="ts">
    import {ref} from 'vue';
    import draggable from 'vuedraggable';
    import type {Column, Project, ProjectWidget, Widget} from "~/src/utils/SupabaseTypes";
    import {API} from "~/src/utils/API/API";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {WidgetProvider} from "~/src/modules/projects/data/WidgetProvider";
    import ProjectBaseWidget from "~/src/modules/projects/components/widgets/ProjectBaseWidget.vue";
    import {Icon} from "@iconify/vue";

    const props = defineProps<{
        project: Project
    }>();

    const {project} = toRefs(props);
    const emits = defineEmits(['reload']);

    const columns = ref<{
        id: number | string,
        widgets: ProjectWidget[]
    }[]>([]);
    let nextColumnId = 0;

    onMounted(() => {
        initializeColumns();
        nextColumnId = columns.value.length + 1;
        reorderColumns();
    });

    function initializeColumns() {
        if (!project.value.project_widgets) return;
        for (let projectWidget of project.value.project_widgets) {
            const foundColumn = columns.value.findIndex((column) => projectWidget.columns.id == column.id);
            if (foundColumn == -1) {
                columns.value.push({
                    id: projectWidget.columns.id,
                    widgets: [projectWidget]
                })
            } else {
                columns.value[foundColumn].widgets.push(projectWidget);
            }
        }
    }

    function nextId() {
        nextColumnId++;
        return nextColumnId;
    }

    const onItemDragEnd = async (event: any) => {
        const {to, from, newIndex, oldIndex, item} = event;

        dragging.value = false;
        if (to.id === 'dropzone') {
            const dropzone = columns.value[columns.value.length - 1];
            if (!dropzone) return;
            // Create a new column with the dragged item

            const columnRequest: APIResponse<Column> = await API.ask(`/projects/${project.value.id}/columns`, 'POST');
            if (!columnRequest.success) return;

            const newColumn = {
                id: columnRequest.data.id,
                widgets: dropzone.widgets,
            };

            columns.value[columns.value.length - 1].widgets = [];
            // Add the new column above the empty column
            columns.value.splice(columns.value.length - 1, 0, newColumn);
        }

        await updatePositions();
    };

    async function updatePositions() {
        let columnOrder = columns.value.map((col, index) => ({
            id: col.id,
            position: index + 1,
        }));

        columnOrder = columnOrder.filter((column) => column.id != 'dropzone');
        console.log("Saving column order:", columnOrder);

        const itemOrder = columns.value.flatMap((column) =>
            column.widgets.map((item, index) => ({
                id: item.id,
                column_id: column.id,
                order: index + 1,
            }))
        );

        await API.ask(`/projects/${project.value.id}/widgets`, 'PUT', {
            columnOrder,
            itemOrder
        });

        for (let column of columns.value) {
            if (column.widgets.length === 0 && column.id != 'dropzone') {
                columns.value = columns.value.filter((currentColumn) => column.id != currentColumn.id);
                await API.ask(`/projects/${project.value.id}/columns/${column.id}`, 'DELETE');
            }
        }
    }

    function reorderColumns() {
        dragging.value = false;
        columns.value = columns.value.filter((column) => column.id != 'dropzone');
        columns.value.push({
            id: 'dropzone',
            widgets: [],
        });

        updatePositions();
    }

    const hoveringOn = ref(0);
    const dragging = ref(false);
</script>

<template>
    <div class="w-full p-4 flex gap-4 flex-col text-black">
        <!-- Draggable Columns -->
        <draggable
            v-model="columns"
            item-key="id"
            class="flex gap-4 w-full flex-col"
            group="columns"
            handle=".column-drag-handle"
            @end="reorderColumns"
            @start="dragging = true"
        >
            <template #item="{ element: column }">
                <div :class="{'border-t border-b border-blue-600 rounded-none': dragging}"
                     @mouseenter="hoveringOn = column.id" class="flex items-center gap-2 rounded">
                    <!-- Column Drag Handle -->
                    <div class="flex flex-1">
                        <!-- Draggable Items within a Column -->
                        <draggable
                            :id="column.id"
                            v-model="column.widgets"
                            item-key="id"
                            class="flex flex-wrap gap-2 w-full"
                            group="items"
                            @end="onItemDragEnd"
                        >
                            <template #item="{ element: item }">
                                <div
                                    class="flex-1 flex items-center justify-center"
                                >
                                    <span class="w-full h-full">
                                        <ProjectBaseWidget @reload="emits('reload')" :project
                                                           :widget="item"></ProjectBaseWidget>
                                    </span>
                                </div>
                            </template>
                        </draggable>
                        <span v-if="column.id !== 'dropzone'" class="column-drag-handle cursor-grab">
                            <icon v-if="hoveringOn == column.id || dragging"
                                  icon="material-symbols:drag-indicator"></icon>
                        </span>
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>

<style>
.drag-handle {
    cursor: grab;
    user-select: none;
}

.column-drag-handle {
    cursor: grab;
    user-select: none;
}
</style>