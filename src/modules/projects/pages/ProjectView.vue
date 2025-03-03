<script setup lang='ts'>
    import type {Project} from "~/src/utils/SupabaseTypes"
    import {API} from "~/src/utils/API/API";
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import EditorComponent from "~/src/modules/projects/components/EditorComponent.vue";
    import hotkeys from 'hotkeys-js';
    import AddWidgetModal from "~/src/modules/projects/components/AddWidget/AddWidgetModal.vue";

    const {id, name} = defineProps<{
        id: number,
        name: string
    }>();

    const open = ref(false);

    const project = ref<null|Project>(null)
    const container = ref<HTMLDivElement | null>(null);
    const accountState = useAccountState();

    onMounted(async () => {
        if(id != accountState.brand?.id) return;

        hotkeys('ctrl+a,command+a', function(event) {
            event.preventDefault();
            open.value = true;
        });

        await getProject();
    });

    async function getProject() {
        project.value = null;
        const getProject: APIResponse<Project> = await API.ask(`/projects/${id}/${name}`);
        if(!getProject.success) return;

        project.value = getProject.data;
    }

    async function closeModal() {
        open.value = false;
        await getProject();
    }

</script>

<template>
    <section v-if="project" class="flex flex-col flex-grow lowercase">
        <div class="w-full">
            <div class="flex gap-4">
                <div :style="`background-color: ${project.color}`" class="flex justify-center items-center w-20 h-20 rounded-lg">
                    <p class="font-semibold text-xl">{{ project.name.charAt(0) }}</p>
                </div>
                <div class="flex flex-col justify-center gap-1">
                    <h1 class="text-black font-semibold text-2xl">{{ project.name }}</h1>
                    <p class="text-lg">{{ project.description }}</p>
                </div>
            </div>
        </div>
        <div  ref="container" v-if="project.project_widgets?.length > 0">
            <ClientOnly>
                <EditorComponent @reload="getProject" :project/>
            </ClientOnly>
        </div>
        <div class="mt-12" v-else>
            empty project, <span @click="open = true" class="underline cursor-pointer">start adding some widgets</span>
        </div>
        <div class="mt-auto flex justify-end">
<!--            <button @click="addWidget" class="rounded flex justify-center items-center h-8 w-8 bg-black text-white">+</button>-->
        </div>
    </section>
    <section v-else>
        project does not exist
    </section>

    <modal-popup v-if="project" :center="false" @close="closeModal" :model-active="open">
        <AddWidgetModal :project_id="project.id" @close="closeModal"/>
    </modal-popup>
</template>