<script setup lang='ts'>

    import {Icon} from "@iconify/vue";
    import ProjectColorSelector from "~/src/modules/projects/components/ProjectColorSelector.vue";
    import CreatorSelector from "~/src/components/Core/CreatorSelector.vue";
    import ToggleButton from "~/src/components/ToggleButton.vue";
    import {API} from "~/src/utils/API/API";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import type {Project} from "~/src/utils/SupabaseTypes"
    import {useRoute, useRouter} from "#app";
    import {stringToSlug} from "~/src/utils/utils";

    const emits = defineEmits(['close', 'update']);
    const {project} = defineProps<{
        project: Project
    }>()

    const title = ref(project.name);
    const description = ref(project.description);
    const creators = ref(project.creators);
    const allCreators = ref(true);
    const loading = ref(false);
    const accountState = useAccountStore();
    const route = useRoute();
    const router = useRouter();


    const color = ref(project.color);
    const alreadyExist = ref(false);

    const colors: {primary: string, secondary: string}[] = [
        {
            primary: '#f6f6f6',
            secondary: '#F1F1F1',
        },
        {
            primary: '#F1F9FF',
            secondary: '#9EBACE',
        },
        {
            primary: '#EFFAF9',
            secondary: '#7EC3BE',
        },
        {
            primary: '#FAF7FE',
            secondary: '#BCB2CE',
        },
        {
            primary: '#F9F8EE',
            secondary: '#BAB798',
        },
    ]

    function getCreatorIds() {
        return allCreators.value ? '' : creators.value
    }

    async function editProject() {
        loading.value = true;
        const editedProjectRequest = await API.ask(`/projects/${project.id}`, 'PUT', {
            name: title.value,
            description: description.value,
            creators: getCreatorIds(),
            days: 365,
            color: color.value,
            brand_id: accountState.brand?.id
        });
        loading.value = false;

        if(!editedProjectRequest.success) {
            if(editedProjectRequest.error === 'PROJECT_ALREADY_EXISTS') alreadyExist.value = true;
            return;
        }

        const slug = stringToSlug(title.value);

        if(route.path.includes(project.slug)) {
            await router.replace(`/projects/${accountState.brand?.id}/${slug}`)
        }

        alreadyExist.value = false;
        emits('update');
    }

</script>

<template>
    <div class="bg-white w-[500px] rounded-lg p-4">
        <div class="w-full flex justify-between items-center">
            <h1 class="font-semibold text-3xl">edit project</h1>
            <Icon @click="emits('close')" class="cursor-pointer" icon="material-symbols:close"/>
        </div>
        <div class="mt-8 flex gap-2 items-center">
            <div :style="`background-color: ${color}`" class="w-[100px] h-[100px] rounded-lg flex items-center justify-center">
                <p class="text-2xl font-semibold">{{title.charAt(0) ? title.charAt(0) : 'c'}}</p>
            </div>
            <ProjectColorSelector :colors v-model="color"/>
        </div>
        <div class="w-full mt-3">
            <p>name</p>
            <input type="text" v-model="title" class="w-full bg-[#FCFCFC] p-2 mt-2 border">
        </div>
        <div class="w-full mt-3">
            <p>description</p>
            <input type="text" v-model="description" class="w-full bg-[#FCFCFC] p-2 mt-2 border">
        </div>
        <div class="mt-3">
            <div class="flex gap-2">
                <p>all creators</p>
                <ToggleButton @toggle="allCreators = !allCreators" :is-on="allCreators"/>
            </div>
            <CreatorSelector v-model="creators" v-if="!allCreators"/>
        </div>
        <div class="flex justify-end gap-2 items-center mt-6">
            <button v-if="!loading" @click="editProject()" class="flex gap-2 items-center p-2 rounded bg-black text-white">
                <Icon class="cursor-pointer" icon="material-symbols:add"/>
                update
            </button>
            <button disabled v-if="loading" class="flex gap-2 items-center p-2 rounded bg-black text-white">
                <Icon class="cursor-pointer" icon="line-md:loading-loop"/>
                create
            </button>
        </div>
    </div>
</template>