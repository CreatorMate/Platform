<script setup lang='ts'>

    import PageTitle from "~/src/components/Core/PageTitle.vue";
    import CreateWidgetModal from "~/src/modules/projects/components/CreateWidget/CreateWidgetModal.vue";
    import type {Widget} from "~/src/utils/SupabaseTypes";
    import {API} from "~/src/utils/API/API";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import {WidgetProvider} from "~/src/modules/projects/data/WidgetProvider";
    import PreviewWidget from "~/src/modules/projects/components/widgets/PreviewWidget.vue";

    const open = ref(false);
    const widget = ref<Widget|null>(null);

    const accountState = useAccountStore();

    function closeModal() {
        open.value = false;
    }

    function getWidgets() {
        open.value = false;
    }

    const widgets = ref<Widget[]>([]);

    onMounted(async () => {
        const widgetRequest: APIResponse<Widget[]> = await API.ask(`/widgets?brand_id=${accountState.brand?.id}`);
        if(!widgetRequest.success) return;

        widgets.value = [...widgetRequest.data];
    });
</script>

<template>
    <section class="flex w-full flex-col">
        <div class="w-full flex justify-between h-auto items-center">
            <PageTitle title="widgets"/>
            <div>
                <button @click="open = true">add widget</button>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <PreviewWidget v-for="widget of widgets" :widget></PreviewWidget>
        </div>
    </section>
    <modal-popup @close="closeModal" :model-active="open">
        <CreateWidgetModal @update="getWidgets()" @close="closeModal" :widget/>
    </modal-popup>
</template>