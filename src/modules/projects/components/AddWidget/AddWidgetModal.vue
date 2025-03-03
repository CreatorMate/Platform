<script setup lang='ts'>

    import {Icon} from "@iconify/vue";
    import AddWidgetRowItem from "~/src/modules/projects/components/AddWidget/AddWidgetRowItem.vue";
    import {API} from "~/src/utils/API/API";
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import type {Widget} from "~/src/utils/SupabaseTypes";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import hotkeys from "hotkeys-js";

    const {project_id} = defineProps<{
        project_id: number
    }>()
    const emits = defineEmits(['close']);
    const accountState = useAccountState();
    let saved = false;

    const searchValue = ref('');

    const defaultWidgets = [
        {
            title: 'Header 1',
            metric: 'titles',
            icon: 'material-symbols:title',
        },
        {
            title: 'Header 2',
            metric: 'titles',
            icon: 'material-symbols:title',
        },
        {
            title: 'Header 3',
            metric: 'titles',
            icon: 'material-symbols:title',
        },
        {
            title: 'Text block',
            metric: 'text',
            icon: 'material-symbols:text-ad-outline',
        },
        {
            title: 'Markdown',
            metric: 'custom',
            icon: 'material-symbols:markdown',
        },
    ];

    const selected = ref('Header 1');
    const selectedItem = ref(0);
    const selectingDefault = ref(true);

    hotkeys('down', function(event: KeyboardEvent) {
        event.preventDefault();
        selectedItem.value++;

        if(selectingDefault.value) {
            if(resultDefaultWidgets.value.length == selectedItem.value) {
                selectingDefault.value = false;
                selectedItem.value = 0;
            }
        } else {
            if(resultCustomWidgets.value.length == selectedItem.value) {
                selectingDefault.value = true;
                selectedItem.value = 0;
            }
        }

        selected.value = selectingDefault.value ? resultDefaultWidgets.value[selectedItem.value].title : resultCustomWidgets.value[selectedItem.value].name
    });

    hotkeys('up', function(event: KeyboardEvent) {
        event.preventDefault();
        selectedItem.value--;

        if(selectedItem.value < 0) {
            if(selectingDefault.value) {
                selectingDefault.value = false;
                selectedItem.value = resultCustomWidgets.value.length-1;
            } else {
                selectingDefault.value = true;
                selectedItem.value = resultDefaultWidgets.value.length-1;
            }
        }

        selected.value = selectingDefault.value ? resultDefaultWidgets.value[selectedItem.value].title : resultCustomWidgets.value[selectedItem.value].name
    });

    hotkeys('enter', async function(event: KeyboardEvent) {
        event.preventDefault();
        if(resultDefaultWidgets.value.length === 0 && resultCustomWidgets.value.length === 0) return;
        if(selectingDefault.value) {
            const widget = resultDefaultWidgets.value.find((widget) => widget.title == selected.value);
            await addDefaultWidget(widget);
        } else {
            const widget = resultCustomWidgets.value.find((widget) => widget.name == selected.value);
            await addCustomWidget(widget);
        }
    });

    function hoverItem(name: string, isDefault: boolean) {
        selectingDefault.value = isDefault;
        selectedItem.value = selectingDefault.value ? resultDefaultWidgets.value.findIndex((item) => item.title == name) : resultCustomWidgets.value.findIndex((item) => item.name == name)
        selected.value = name;
    }

    const resultCustomWidgets = ref<Widget[]>([]);
    const resultDefaultWidgets = ref([...defaultWidgets]);
    await search();

    async function search() {
        const result: APIResponse<Widget[]> = await API.ask(`/widgets?brand_id=${accountState.brand?.id}&search=${searchValue.value}`);
        if(!result.success) return;
        resultCustomWidgets.value = result.data;
        resultDefaultWidgets.value = defaultWidgets.filter((widget) => widget.title.toLowerCase().includes(searchValue.value.toLowerCase()));
        selectedItem.value = 0;

        selectingDefault.value = resultDefaultWidgets.value.length > 0

        selected.value = selectingDefault.value ? resultDefaultWidgets.value[selectedItem.value].title : resultCustomWidgets.value[selectedItem.value].name
    }

    async function addCustomWidget(widget: any) {
        if(saved) return;
        saved = true;

        const result = await API.ask(`/projects/${project_id}/widgets?custom=true`, 'POST', {
            widget_id: widget.id
        });

        emits('close');
    }

    async function addDefaultWidget(widget: any) {
        if(saved) return;
        saved = true;

        const result = await API.ask(`/projects/${project_id}/widgets?custom=false`, 'POST', {
            component: widget.title,
            value: widget.title
        });

        emits('close');
    }
</script>

<template>
    <div class="bg-white w-[750px] rounded-2xl max-h-[570px] min-h-[570px] flex flex-col">
        <div class="flex rounded-t-2xl min-h-12 items-center justify-between px-4 border-b text-gray-400">
            <div>
                <Icon height="24" icon="material-symbols:search-rounded"></Icon>
            </div>
            <input v-model="searchValue" @input="search" placeholder="Search widgets" class="flex flex-grow mx-2 h-full outline-none ">
            <div>
                <Icon icon="material-symbols:filter-list"></Icon>
            </div>
        </div>
        <div class="flex flex-grow overflow-y-auto flex-col py-4">
            <p v-if="resultDefaultWidgets.length > 0" class="text-sm px-3 text-gray-500 font-medium mb-2">Default</p>
            <AddWidgetRowItem v-for="widget of resultDefaultWidgets" @click="addDefaultWidget(widget)" :title="widget.title" :metric="widget.metric" :icon="widget.icon" :selected @hover="hoverItem(widget.title, true)"></AddWidgetRowItem>
            <p v-if="resultCustomWidgets.length > 0" class="text-sm px-3 text-gray-500 font-medium mb-2 mt-3">Custom</p>
            <AddWidgetRowItem v-for="widget of resultCustomWidgets" @click="addCustomWidget(widget)" :title="widget.name" :metric="widget.metric_name" :icon="widget.icon" :selected @hover="hoverItem(widget.name, false)"></AddWidgetRowItem>
        </div>
        <div class="flex min-h-6 border-t rounded-b-2xl"></div>
    </div>
</template>