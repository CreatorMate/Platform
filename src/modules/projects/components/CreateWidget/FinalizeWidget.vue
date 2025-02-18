<script setup lang='ts'>
    import type {Widget} from "~/src/utils/SupabaseTypes";
    import type {ModelRef} from "vue";
    import {type ComponentType, WidgetProvider} from "~/src/modules/projects/data/WidgetProvider";
    import {type Metric, MetricKind} from "~/src/api/modules/projects/types/MetricTypesList"

    const {metric} = defineProps<{
        metric: Metric
    }>();

    const widget: ModelRef<Widget | undefined> = defineModel();

    const emits = defineEmits(['update']);

    const components = ref<ComponentType[]>([]);
    const selectedComponent = ref<ComponentType | null>(null);

    const segments = ref<{ percentage: number, title: string }[]>([]);

    onMounted(() => {
        if (!widget.value) return;
        widget.value.name = `${widget.value.action} ${widget.value.metric_name}`
        const availableComponents = WidgetProvider.getComponents(metric, widget.value);
        components.value = availableComponents;
        selectedComponent.value = availableComponents[0];

        for(let i = 0; i < widget.value.top; i++) {
            segments.value.push({percentage: 100 / widget.value.top, title: `item ${i}`});
        }
    });

    function next() {
        if (!widget.value || !selectedComponent.value) return;
        widget.value.component = selectedComponent.value.name;
        emits('update');
    }

</script>

<template>
    <section v-if="widget">
        <div v-if="!selectedComponent" class="border w-full p-6 mt-6">
            preview
        </div>
        <div v-else class="w-full mt-6">
            <component :segments :description="widget.description" :title="widget.name" :is="selectedComponent.component"/>
        </div>
        <div class="flex flex-col gap-2 mt-6">
            <label class="text-lg">display as</label>
            <select v-model="selectedComponent" class="w-full border px-3 py-2">
                <option v-for="component of components" :value="component">{{ component.name }}</option>
            </select>
        </div>
        <div class="flex flex-col gap-2 mt-6">
            <label class="text-lg">title</label>
            <input v-model="widget.name" class="w-full border px-3 py-2">
        </div>
        <div class="flex flex-col gap-2 mt-6">
            <label class="text-lg">description</label>
            <input v-model="widget.description" class="w-full border px-3 py-2">
        </div>
        <div class="flex w-full justify-end mt-6">
            <button :disabled="widget.name == ''" @click="next" class="bg-black disabled:bg-gray-400 py-2 px-6 text-white rounded-lg">next</button>
        </div>
    </section>
</template>