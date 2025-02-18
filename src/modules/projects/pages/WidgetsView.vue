<script setup lang='ts'>

    import PageTitle from "~/src/components/Core/PageTitle.vue";
    import AddWidgetModal from "~/src/modules/projects/components/CreateWidget/AddWidgetModal.vue";
    import type {Widget} from "~/src/modules/projects/projectdata";

    const open = ref(true);
    const widget = ref<Widget|null>(null);

    function closeModal() {
        open.value = false;
    }

    function getWidgets() {

    }
</script>

<template>
    <section class="flex w-full flex-col">
        <div class="w-full flex justify-between h-auto items-center">
            <PageTitle title="widgets"/>
            <div>
                <button @click="open = true">add widget</button>
            </div>
        </div>
        <div class="flex flex-grow">

        </div>
    </section>
    <modal-popup @close="closeModal" :model-active="open">
        <AddWidgetModal @update="getWidgets()" @close="closeModal" :widget/>
    </modal-popup>
</template>