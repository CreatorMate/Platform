import {defineStore} from "pinia";
import type {CreatorProfile} from "~/src/utils/CreatorAPITypes";
import type {APIResponse} from "~/src/api/utils/HonoResponses";
import {useAccountStore} from "~/src/utils/Auth/AccountStore";

export const useAnalyticFilterState = defineStore("analyticsFilter", () => {
    const creators = ref<CreatorProfile[]>([]);
    const accountState = useAccountStore();
    const selectedCreators = ref<CreatorProfile[]>([]);
    const ids = ref<string[]>([]);
    const actions = ref(0);
    const days = ref(90);
    const key = ref('likes');

    async function getCreators() {
        const profiles: APIResponse<CreatorProfile[]> = await $fetch(`/API/creator_api/brands/${accountState.brand?.id}/profiles`);
        if(!profiles.success) return;

        creators.value = profiles.data;
    }

    function filterCreator(creator: CreatorProfile, add: boolean = false) {
        if(add) {
            if(selectedCreators.value.includes(creator)) return;
            selectedCreators.value.push(creator);
            ids.value.push(creator.id);
        } else {
            selectedCreators.value = selectedCreators.value.filter((currentCreator) => currentCreator != creator);
            ids.value = ids.value.filter((currentId) => currentId != creator.id);
        }
        actions.value++;
    }

    function getIds(): string {
        let idsString = '';

        for(const id of ids.value) {
            idsString += `${id},`;
        }

        return idsString;
    }


    return {creators, getCreators, filterCreator, selectedCreators, getIds, actions, days, key}
});