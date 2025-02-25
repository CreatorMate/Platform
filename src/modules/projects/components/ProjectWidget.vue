<script setup lang='ts'>
    import type {ProjectWidget, Widget} from "~/src/utils/SupabaseTypes";
    import {WidgetProvider} from "~/src/modules/projects/data/WidgetProvider";

    const {widget} = defineProps<{
        widget: ProjectWidget
    }>();
</script>

<template>
    <component :number="Math.round(Math.random() * 100)" :description="widget.widgets.description" :title="widget.widgets.name" :is="WidgetProvider.getComponent(widget.widgets.component)?.component"/>
</template>