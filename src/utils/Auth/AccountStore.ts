import {defineStore} from "pinia";
import type {Brand, User} from "~/src/utils/SupabaseTypes";
import type {APIResponse} from "~/api/utils/HonoResponses";
import {appSettings} from "~/src/GlobalSettings";

export const useAccountStore = defineStore("account", () => {
    const user = ref<User|null>(null);
    const brand = ref<Brand|null>(null);
    async function initialize() {
        try {
            const result: APIResponse<User> = await $fetch(`${appSettings.baseUrl}/hono/users/me`);
            if(!result.success) return;
            if(result.data) {
                user.value = result.data;
                const brandResult: APIResponse<Brand> = await $fetch(`${appSettings.baseUrl}/hono/brands/${result.data.brand_id}`);
                if(!brandResult.success) return;
                brand.value = brandResult.data;
            }
        } catch (error) {
            console.error('Failed to fetch session data:', error);
            throw error; // Rethrow if you want middleware to handle it
        }
    }

    async function save() {
        const result = await $fetch(`${appSettings.baseUrl}/hono/users/me`, {
            method: "PUT",
            body: JSON.stringify(user.value)
        });
    }

    return {initialize, user, save, brand}
})