import {defineStore} from "pinia";
import type {User} from "~/src/utils/User";
import type {APIResponse} from "~/server/utils/APIResponse";

export const useAccountStore = defineStore("account", () => {
    const user = ref<User|null>();
    async function initialize() {
        try {
            const result: APIResponse = await $fetch('http://localhost:3000/API/users/me');
            if(!result.success) return;
            if(result.data) {
                user.value = result.data
            }
        } catch (error) {
            console.error('Failed to fetch session data:', error);
            throw error; // Rethrow if you want middleware to handle it
        }
    }

    async function save() {
        const result = await $fetch('http://localhost:3000/API/users/me', {
            method: "PUT",
            body: JSON.stringify(user.value)
        });
    }

    return {initialize, user, save}
})