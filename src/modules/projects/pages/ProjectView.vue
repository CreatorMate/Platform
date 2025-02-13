<script setup lang='ts'>
    import {getWidgets, projects, type Widget} from "~/src/modules/projects/projectdata";
    import {createSwapy, type Swapy} from 'swapy'
    import InstagramConnect from "~/src/components/InstagramConnect.vue";

    const {id, name} = defineProps<{
        id: number,
        name: string
    }>();

    const swapy = ref<Swapy | null>(null)
    const container = ref<HTMLDivElement | null>(null);

    onMounted(() => {
        if (container.value) {
            swapy.value = createSwapy(container.value, {
                // manualSwap: true
            });

            swapy.value.onSwap(event => {
                console.log('swap', event)
            });
        }
    })

    onUnmounted(() => {
        swapy.value?.destroy();
    });

    const project = projects.get(name);
    const widgets = ref<Widget[]>([]);
    if (project) {
        widgets.value = getWidgets(project.id);
    }

    const getComponent = (widget: Widget) => {
        let component = '';
        if (widget.type == 'single-stat-card') {
            component = 'AverageField';
        } else if (widget.type === 'text') {
            component = 'TextBlock';
        }
        const componentMap: Record<string, any> = {
            TextBlock: defineAsyncComponent(() => import("../components/TextWidget.vue")),
            AverageField: defineAsyncComponent(() => import("../../analytics/components/cards/PostFieldAverageCard.vue")),
        };
        return componentMap[component] || null;
    }

    function getObject(props: string): Object {
        console.log(props)
        if (!props) return {};
        return JSON.parse(props);
    }

    function addWidget() {
        widgets.value.push({
            project_id: 1,
            name: 'text widget second',
            type: 'text',
            field: '',
            action: '',
            props: '{"color": "blue"}',
            value: 'this is text',
        },)
    }
</script>

<template>
    <section v-if="project" class="flex flex-col flex-grow lowercase">
        <div class="w-full">
            <div class="flex gap-4">
                <div class="flex justify-center items-center w-20 h-20 bg-[#F1F1F1] rounded-lg">
                    <p class="font-semibold text-xl">{{ project.icon }}</p>
                </div>
                <div class="flex flex-col justify-center gap-1">
                    <h1 class="text-black font-semibold text-2xl">{{ project.name }}</h1>
                    <p class="text-lg">{{ project.description }}</p>
                </div>
            </div>
        </div>
        <div class="mt-12" ref="container">
            <div v-for="widget of widgets" :data-swapy-slot="widget.name">
                <div :data-swapy-item="widget.name">
                    <component :key="widget.name" :is="getComponent(widget)" :widget="widget"
                               v-bind="getObject(widget.props)" :field="widget.field"/>
                </div>
            </div>
        </div>
        <div class="mt-auto flex justify-end">
            <InstagramConnect/>
            <button @click="addWidget" class="rounded flex justify-center items-center h-8 w-8 bg-black text-white">+</button>
        </div>
    </section>
    <section v-else>
        project does not exist
    </section>

</template>