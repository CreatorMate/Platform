<script setup lang='ts'>
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {bool} from "sharp";

    const router = useRouter();
    const supabase = useSupabaseClient();
    const invited = ref(true);
    const brands = ref<{id: number, name: string, accepted: boolean}[]>([]);
    const creatorEmail = ref('');
    const creatorId = ref('');

    onBeforeMount(async () => {
        const session = await supabase.auth.getSession();
        if (!session.data.session) {
            await router.replace('/creators/login');
            return;
        }
        const email = session.data.session?.user.email;

        const response: APIResponse = await $fetch(`/API/creators/${email}`);
        if (!response.success) {
            invited.value = false;
            return;
        }

        if(!response.data.waitlist_id) {
            await router.replace('/creators/invited');
            return;
        }

        creatorEmail.value = response.data.email
        creatorId.value = response.data.id

        const brandsRequest = await $fetch(`/API/creator/${response.data.waitlist_id}/brands`);

        brands.value = [...brandsRequest.data];
    });

    async function logout() {
        await supabase.auth.signOut();
        await router.replace('/creators/login');
    }

    async function check(event: Event, brandId: number) {
        const target = event.target as HTMLInputElement;
        await $fetch(`/API/creator/${creatorId.value}/brand`, {
            method: 'PUT',
            body: JSON.stringify({
                accepted: target.checked,
                brand_id: brandId
            }),
            headers: {
                'Content-Type': 'application/json' // Ensure the content type is set
            }
        })
    }
</script>

<template>
    <div class="box">
        <h1 class="text-2xl font-medium">welcome {{creatorEmail}}</h1>
        <p class="text-xl my-3">see all your connected brands.</p>
        <div class="flex flex-col">
            <div class="flex items-center justify-between w-full" v-for="brand of brands">
                <p>{{brand.name}}</p>
                <input @change="check($event, brand.id)" :checked="brand.accepted" type="checkbox">
            </div>
        </div>
        <button class="w-full bg-black rounded-lg px-4 py-4 text-white mt-3">disconnect instagram</button>
        <p @click="logout" class="text-center mt-3 hover:underline">log out</p>
    </div>
</template>