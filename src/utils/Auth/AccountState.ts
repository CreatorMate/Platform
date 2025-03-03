import {defineStore} from "pinia";
import type {Brand, InstagramAccount, User} from "~/src/utils/SupabaseTypes";
import type {APIResponse} from "~/src/api/utils/HonoResponses";
import {appSettings} from "~/src/GlobalSettings";
import {API} from "~/src/utils/API/API";

export const useAccountState = defineStore("account", () => {
    const user = ref<User|null>(null);
    const brand = ref<Brand|null>(null);
    const instagramAccount = ref<InstagramAccount|null>(null);
    async function initialize() {
        try {
            const result: APIResponse<User> = await API.ask(`/users/me`);
            if(!result.success) return;
            if(result.data) {
                user.value = result.data;
                brand.value = result.data.brands;
                instagramAccount.value = result.data.brands.instagram_accounts;
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

    return {initialize, user, save, brand, instagramAccount}
});