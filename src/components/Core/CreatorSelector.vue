<script setup lang='ts'>
    import type {Ref} from "vue";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import type {CreatorProfile} from "~/src/utils/CreatorAPITypes";
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import {Icon} from "@iconify/vue";
    import {API} from "~/src/utils/API/API";

    const model = defineModel();
    let open = ref(false);
    const searchValue = ref('');

    let creators: Ref<CreatorProfile[]> = ref([]);
    let creatorResults: Ref<CreatorProfile[]> = ref([]);
    let selectedCreators: Ref<CreatorProfile[]> = ref([]);
    const ids = ref<string[]>([]);
    const accountState = useAccountState();

    onMounted(async () => {
        await getCreators()
    })

    function filterCreator(creator: CreatorProfile, add: boolean = false) {
        if(add) {
            if(selectedCreators.value.includes(creator)) return;
            selectedCreators.value.push(creator);
            ids.value.push(creator.id);
            updateModel();
        } else {
            selectedCreators.value = selectedCreators.value.filter((currentCreator) => currentCreator != creator);
            ids.value = ids.value.filter((currentId) => currentId != creator.id);
            updateModel();
        }
    }

    function updateModel() {
        let value = '';
        for(const id of ids.value) {
            value += `${id},`
        }
        model.value = value;
    }

    async function search() {
        creatorResults.value = creators.value.filter((creator) => creator.username.includes(searchValue.value));
    }

    async function getCreators() {
        const profiles: APIResponse<CreatorProfile[]> = await API.ask(`/creator_api/brands/${accountState.brand?.id}/profiles`);
        if(!profiles.success) return;

        creators.value = profiles.data;
        creatorResults.value = profiles.data;
    }
</script>

<template>
    <div @click="open = !open" class="flex flex-grow flex-col bg-white pt-0.5 relative mt-2">
        <input @change="search" @keydown.enter="search" v-model="searchValue" class="w-full outline-none border border-[#F5F5F5] py-1 px-3 cursor-pointer" placeholder="select your creators" />
        <div v-if="open" class="absolute top-10 border shadow w-full z-50 bg-white">
            <div @click="filterCreator(creator, true)" class="w-full pl-3 py-1 hover:bg-blue-600 hover:text-white" v-for="creator of creatorResults">
                <p v-if="!selectedCreators.includes(creator)">
                    {{creator.username}}
                </p>
            </div>
        </div>
    </div>
    <div class="flex flex-wrap mb-14 gap-3 mt-3">
        <div @click="filterCreator(creator)" class="bg-gray-300 flex gap-1 items-center px-3 py-1 cursor-pointer" v-for="creator of selectedCreators">
            <p>{{creator.username}}</p>
            <Icon width="20" icon="material-symbols:close-small"></Icon>
        </div>
    </div>
</template>