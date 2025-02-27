<script setup lang='ts'>
    import {Icon} from "@iconify/vue";
    import type {Project} from "~/src/utils/SupabaseTypes"
    import {API} from "~/src/utils/API/API";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import AddProjectModal from "~/src/modules/projects/components/AddProjectModal.vue";

    const route = useRoute();
    const show = ref(false);

    function isActive(path: string) {
        return route.fullPath === path;
    }

    const loading = ref(true);
    const open = ref(false);

    const projects = ref<Project[]>([]);
    const accountState = useAccountStore();

    onMounted(async () => {
        await getProjects();
    });

    async function getProjects() {
        loading.value = true;
        const projectsRequest: APIResponse<Project[]> = await API.ask(`/projects/${accountState.brand?.id}`);
        if(!projectsRequest.success) return;

        projects.value = projectsRequest.data;
        loading.value = false;
        open.value = false;
    }

    async function closeModal() {
        open.value = false
    }

</script>

<template>
    <div class="flex w-full justify-between items-center mt-12">
        <p class=" text-sm pl-2">projects</p>
        <Icon @click="open = true" class="cursor-pointer" icon="material-symbols:add"/>
    </div>
    <div v-if="loading" class="w-full flex justify-center">
        <Icon width="16" icon="line-md:loading-loop"></Icon>
    </div>
    <div v-else class="flex flex-col gap-2 max-h-[150px] overflow-auto">
        <NuxtLink v-for="project of projects" :to="`/projects/${project.brand_id}/${project.slug}`" :class="{
        'bg-[#E2E2E2] text-text-dark' : isActive(`/projects/${project.brand_id}/${project.slug}` )
    }" @click="show = !show" class="flex py-2 px-4 items-center justify-between cursor-pointer rounded-xl">
            <div class="flex items-center gap-2 transition duration-100 hover:translate-x-4">
                <div :style="`background-color: ${project.color}`" class="rounded h-8 w-8 flex justify-center items-center">{{project.name.charAt(0)}}</div>
                <p class="text-sm">{{project.name}}</p>
            </div>
        </NuxtLink>
    </div>
    <modal-popup @close="closeModal" :model-active="open">
        <AddProjectModal @update="getProjects()" @close="closeModal"/>
    </modal-popup>
</template>