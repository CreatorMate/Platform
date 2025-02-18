<script setup lang='ts'>
    import {Icon} from "@iconify/vue";
    import type {Metric} from "~/src/api/modules/projects/types/MetricTypesList"
    import SelectMetric from "~/src/modules/projects/components/CreateWidget/SelectMetric.vue";
    import type {Widget} from "~/src/utils/SupabaseTypes";
    import CustomizeMetric from "~/src/modules/projects/components/CreateWidget/CustomizeMetric.vue";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import FinalizeWidget from "~/src/modules/projects/components/CreateWidget/FinalizeWidget.vue";

    const metric = ref<Metric | null>(null);
    const emits = defineEmits(['close', 'update']);
    const step = ref(1);
    const accountState = useAccountStore();
    const widget = ref<Widget>({
        id: 0,
        name: '',
        description: '',
        top: 10,
        grouped: true,
        action: '',
        endpoint: '',
        component: '',
        brand_id: accountState.brand?.id ?? 0,
        metric_name: '',
    })

    onMounted(() => {
        if (metric.value != null && step.value < 2) step.value = 2;
    });

    async function next() {
        switch (step.value) {
            case 1:
                goToCustomization();
                break;
            case 2:
                gotoCreation();
                break;
            case 3:
                await finish();
                break;
            default:
                break;
        }
    }

    function goToCustomization() {
        if (!metric.value) return;
        widget.value.metric_name = metric.value?.name ?? '';
            step.value = 2;
    }

    function gotoCreation() {
        step.value = 3;
    }

    async function finish() {
        console.log(widget.value);
    }
</script>

<template>
    <div class="bg-white w-[700px] rounded-lg p-4 max-h-[600px] min-h-[600px] overflow-y-scroll">
        <div class="w-full flex justify-between items-center">
            <div class="font-semibold text-3xl flex gap-2">
                <h1 class="">add widget</h1>
                <h1 class="text-[#868686]">step {{ step }}/3</h1>
            </div>
            <Icon @click="emits('close')" class="cursor-pointer" icon="material-symbols:close"/>
        </div>
        <SelectMetric v-if="step === 1" @update="next" v-model="metric"></SelectMetric>
        <CustomizeMetric v-if="step === 2" v-model="widget" :metric @update="next"></CustomizeMetric>
        <FinalizeWidget v-if="step === 3" @update="next" v-model="widget" :metric></FinalizeWidget>
    </div>
</template>