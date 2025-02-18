<script setup lang='ts'>
    import type {Metric} from "~/src/api/modules/projects/types/MetricTypesList"
    import {API} from "~/src/utils/API/API";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import type {Ref} from "vue";
    import {Icon} from "@iconify/vue";

    const model = defineModel();
    const emits = defineEmits(['update']);

    const metrics: Ref<Metric[]> = ref([]);

    onMounted(async () => {
        const request: APIResponse<Metric[]> = await API.ask('/metrics');
        if(!request.success) return;

        metrics.value.push(...request.data);
    });

    function select(metric: Metric) {
        model.value = metric;
        emits('update');
    }
</script>

<template>
    <p class="text-2xl mt-3 text-[#868686] mb-12">select metric to display</p>
    <div v-for="metric of metrics" class="w-full border-b flex justify-between items-center py-2">
        <div>
            <p class="text-xl font-medium">{{metric.name}}</p>
            <p class="text-sm text-[#868686]">{{metric.description}}</p>
        </div>
        <div class="flex items-center gap-6">
            <p class="px-6 py-1 rounded-full border">{{metric.category}}</p>
            <Icon @click="select(metric)" width="24" class="cursor-pointer text-[#868686] hover:text-black" icon="material-symbols:arrow-right-alt"></Icon>
        </div>
    </div>
</template>