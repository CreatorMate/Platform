<script setup lang='ts'>
    import type {Project} from "~/src/utils/SupabaseTypes"
    import {Icon} from "@iconify/vue";
    import Dropdown from "~/src/components/Dropdown/Dropdown.vue";
    import {API} from "~/src/utils/API/API";
    import {useRouter} from "#app";
    import AddProjectModal from "~/src/modules/projects/components/AddProjectModal.vue";
    import EditProjectModal from "~/src/modules/projects/components/EditProjectModal.vue";

    const {project} = defineProps<{
        project: Project
    }>();
    const emits = defineEmits(['update']);
    const route = useRoute();
    const open = ref(false);
    const openEdit = ref(false);
    const router = useRouter();

    const hovering = ref(false);

    function isActive(path: string) {
        return route.fullPath === path;
    }

    function closeModal() {
        openEdit.value = false;
    }

    async function deleteProject() {
        await API.ask(`/projects/${project.id}`, 'DELETE');
        emits('update');
        await router.push('/projects');
    }
</script>

<template>
    <div @mouseenter="hovering = true" @mouseleave="hovering = false" class="relative w-full flex  justify-between cursor-pointer items-center pr-3 hover:bg-[#E9E9E9]" :class="{
        'bg-[#E9E9E9] text-text-dark' : isActive(`/projects/${project.brand_id}/${project.slug}` )
    }">
        <NuxtLink :to="`/projects/${project.brand_id}/${project.slug}`" class="flex flex-grow py-3 px-3 items-center">
            <div class="flex items-center gap-2 transition duration-100 text-sm">
                <div :style="`background-color: ${project.color}`"
                     class="rounded h-6 w-6 flex justify-center items-center lowercase">
                    {{ project.name.charAt(0) }}
                </div>
                <p class="">{{ project.name }}</p>
            </div>

        </NuxtLink>
        <Icon v-if="hovering" @click="open = !open" class="cursor-pointer" icon="charm:menu-meatball"></Icon>
        <Dropdown class="dropdown right-3 top-8" @close="open = false" :open>
            <div class="flex flex-col w-32 items-start rounded-xl shadow">
                <button @click="openEdit = true" class="px-3 py-2 hover:bg-blue-100 w-full text-left">Edit project</button>
                <button @click="deleteProject" class="px-3 py-2 hover:bg-blue-100 w-full text-left">Delete project</button>
            </div>
        </Dropdown>
    </div>

    <modal-popup @close="closeModal" :model-active="openEdit">
        <EditProjectModal :project @update="emits('update')" @close="closeModal"/>
    </modal-popup>
</template>