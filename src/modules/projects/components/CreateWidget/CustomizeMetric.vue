<script setup lang='ts'>
    import type {ModelRef} from "vue";
    import type {Widget} from "~/src/utils/SupabaseTypes";
    import {type Metric, MetricKind} from "~/src/api/modules/projects/types/MetricTypesList"

    const props = defineProps<{
        metric: Metric
    }>();
    const {metric} = toRefs(props);
    const emits = defineEmits(['update']);
    const widget: ModelRef<Widget | undefined> = defineModel();

    const selectedAction = ref('');

    function next() {
        if(!widget.value) return;

        widget.value.action = selectedAction.value;
        widget.value.endpoint = metric.value.actions[selectedAction.value] ?? '';

        emits('update');
    }
</script>

<template>
    <section v-if="widget" class="flex flex-col flex-grow">
        <p class="text-xl mt-3 text-[#868686] mb-12">custimize the selected <{{metric.name}}> metric </p>
        <div class="flex flex-col gap-2">
            <label class="text-lg">What do you want to do with the data</label>
            <select v-model="selectedAction" class="w-full border">
                <option v-for="(value, key) in metric.actions" :key="key" :value="key">
                    {{ key }}
                </option>
            </select>
        </div>
        <div v-if="metric.kind == MetricKind.SINGLE" class="flex flex-col gap-2 mt-6">
            <label class="text-lg">Group the creator</label>
            <ToggleButton @toggle="widget.grouped = !widget.grouped" :is-on="widget.grouped"></ToggleButton>
        </div>
        <div v-if="metric.kind != MetricKind.SINGLE" class="flex flex-col gap-2 mt-6">
            <label class="text-lg">Amount of items (items are sorted)</label>
            <input class="w-full border py-1 px-3" v-model="widget.top" type="number">
        </div>
        <div class="flex w-full justify-end mt-auto">
            <button :disabled="selectedAction == ''" @click="next" class="bg-black disabled:bg-gray-400 py-2 px-6 text-white rounded-lg">next</button>
        </div>
    </section>
</template>