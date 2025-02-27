<script setup lang='ts'>
    import type {Widget} from "~/src/utils/SupabaseTypes";
    import {WidgetProvider} from "~/src/modules/projects/data/WidgetProvider";

    const {widget} = defineProps<{
        widget: Widget
    }>()

    const segments = ref<{ percentage: number, title: string }[]>([]);
    const bars = ref<{ name: string, percentage: number, value?: string }[]>([]);

    onMounted(() => {
        for(let i = 0; i < widget.top; i++) {
            segments.value.push({percentage: 100 / widget.top, title: `item ${i}`});
            bars.value.push({percentage: 100 / widget.top, name: `item ${i}`});
        }
    });
</script>

<template>
    <component :segments :bars :number="0" :description="widget.description"
               :title="widget.name" :is="WidgetProvider.getComponent(widget.component)?.component"/>
</template>