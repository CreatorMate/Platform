import {defineStore} from "pinia";
import type {Brand, User} from "~/src/utils/SupabaseTypes";
import type {APIResponse} from "~/src/api/utils/HonoResponses";
import {appSettings} from "~/src/GlobalSettings";

export const useAccountStore = defineStore("account", () => {
    const user = ref<User|null>(null);
    const brand = ref<Brand|null>(null);
    async function initialize() {
        try {
            const result: APIResponse<User> = await $fetch(`${appSettings.baseUrl}/API/users/me`);
            if(!result.success) return;
            if(result.data) {
                console.log(result)
                user.value = result.data;
                brand.value = result.data.brands;
            }
        } catch (error) {
            console.error('Failed to fetch session data:', error);
            throw error; // Rethrow if you want middleware to handle it
        }
    }

    async function save() {
        const result = await $fetch(`${appSettings.baseUrl}/API/users/me`, {
            method: "PUT",
            body: JSON.stringify(user.value)
        });
    }

    return {initialize, user, save, brand}
})