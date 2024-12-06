import {defineStore} from "pinia";
import type {User} from "~/server/types/User";
import type {APIResponse} from "~/server/utils/APIResponse";

export const useAccountStore = defineStore("account", () => {
    const user = ref<User|null>();
    async function initialize() {
        try {
            const result: APIResponse<User> = await $fetch('/api/me/get');
            if(!result.success) return errorResponse('failed to fetch user');
            if(result.data) {
                user.value = result.data
            }
        } catch (error) {
            console.error('Failed to fetch session data:', error);
            throw error; // Rethrow if you want middleware to handle it
        }
    }

    async function save() {
        const result = await $fetch('/api/me/update', {
            method: "POST",
            body: JSON.stringify(user.value)
        });
    }

    return {initialize, user, save}
})