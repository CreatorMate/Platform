<script setup lang="ts">

    import {Icon} from "@iconify/vue";
    import type {APIResponse} from "~/server/utils/APIResponse";
    import {useRoute} from "#imports";

    const route = useRoute();
    const brandId = route.params.brand_id;
    const userId = route.params.user_id;

    const name = ref('');
    const error = ref('');
    const accepted = ref(false);
    const acceptationError = ref(false);

    async function acceptInvitation() {
        error.value = '';
        if (name.value.length === 0) {
            error.value = 'this field is required'
            return;
        }
        if (name.value.length < 3) {
            error.value = 'field must be at least 3 characters big'
            return;
        }

        const result: APIResponse = await $fetch('/api/creators/acceptInvitation', {
            method: 'POST',
            body: JSON.stringify({
                name: name.value,
                brandId: brandId,
                userId: userId
            }),
        });

        accepted.value = true;
        if(!result.success) {
            acceptationError.value = true;
            return;
        }
    }

</script>

<template>
    <main class="screen-size bg-background flex justify-center items-center text-background-text">
        <section class="w-[1000px]">
            <div class="absolute top-20">
                <NuxtImg class=" w-[54px]" src="/logo.png"></NuxtImg>
                <div class="flex mt-24 items-center gap-3 mb-14">
                    <Icon icon="ep:back"/>
                    <p class=" font-medium">back</p>
                </div>
            </div>
            <div v-if="!accepted">
                <div class="flex gap-3 flex-col">
                    <h2 class="text-text-dark font-semibold text-2xl ">what's your name?</h2>
                    <p class="italic">we also love nicknames!</p>
                    <div>
                        <input v-model="name" placeholder="Jens Glerum"
                               class="w-80 px-3 py-2 rounded-lg border border-black border-opacity-30 outline-none text-black"/>
                        <p class="text-red-500">{{ error }}</p>
                    </div>
                </div>
                <button @click="acceptInvitation" class="mt-12 bg-black text-white px-5 py-3 rounded-xl">accept invite
                </button>
            </div>
            <div v-else>
                <p v-if="!acceptationError" class="font-medium">thanks for accepting the invite, {brand_name} is looking forward to working with
                    you</p>
                <p v-else class="font-medium text-red-500">you already accepted this invite, if you think this is wrong try again later</p>
            </div>
        </section>
    </main>
</template>