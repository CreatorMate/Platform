<script setup lang='ts'>
    import type {Creator} from "~/src/utils/SupabaseTypes";
    import {Icon} from "@iconify/vue";
    import Dropdown from "~/components/Dropdown/Dropdown.vue";
    import AreYouSure from "~/components/Modal/AreYouSure.vue";

    const {creator} = defineProps<{
        creator: Creator
    }>();

    const emits = defineEmits(['refresh']);
    const open = ref(false);
    const areYouSure = ref(false);

    function getDate(creator: Creator): string {
        const date = new Date(creator.created);
        return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`;
    }

    function copy() {
        navigator.clipboard.writeText(`https://app.creatormate.com/invitation/${creator.brand_id}/${creator.id}`);
        open.value = false;
    }

    async function resend() {
        const result = await $fetch('/hono/emails/inviteCreators', {
            method: 'POST',
            body: JSON.stringify({
                emails: [creator.email]
            })
        });
        open.value = false;
    }

    async function deleteCreator() {
        const deleteCreatorResult = await $fetch('/hono/brands/creators/' + creator.id, {
            method: 'DELETE'
        })
        open.value = false;
        areYouSure.value = false;
        emits('refresh');
    }
</script>

<template>
    <tr @click="" class="h-16 border-b border-black border-opacity-10 text-text-dark">
        <td class="w-12">
            <div class="w-4 h-4 border"></div>
        </td>
        <td>{{ creator.username }}</td>
        <td>
            <p class="px-2.5 py-1 rounded w-fit" :class="{
                    'bg-green-100 text-green-600': creator.status == 'retained',
                    'bg-red-100 text-red-600': creator.status == 'churned',
                    'bg-blue-100 text-blue-600': creator.status == 'acquired',
                    'bg-yellow-100 text-yellow-600': creator.status == 'pending',
                }">{{ creator.status }}</p></td>
        <td>{{ creator.email }}</td>
        <td>
            <p class="px-2.5 py-1 rounded w-fit bg-black bg-opacity-5">
                commision
            </p>
        </td>
        <td>{{ getDate(creator) }}</td>
        <td>{{ creator.country }}</td>
        <td>
            <Icon @click="open = !open" class="cursor-pointer" icon="charm:menu-meatball"></Icon>
            <Dropdown @close="open = false" :open>
                <div class="flex flex-col w-56 items-start rounded-xl shadow">
                    <button @click="resend" class="px-3 py-2 hover:bg-blue-100 w-full text-left">Resend invitation</button>
                    <router-link :to="`/creators/${creator.id}`" v-if="creator.status === 'acquired'" @click="resend" class="px-3 py-2 hover:bg-blue-100 w-full text-left">go to user</router-link>
                    <button @click="copy" class="px-3 py-2 hover:bg-blue-100 w-full text-left">Copy invite</button>
                    <button @click="areYouSure = true" class="px-3 py-2 hover:bg-blue-100 w-full text-left text-red-600">Remove user</button>
                </div>
            </Dropdown>
        </td>
    </tr>
    <AreYouSure @cancel="areYouSure = false" @delete="deleteCreator" title="Are you sure?" :subtitle="`You'll lose all data that is bound to this creator, we can't recover it once you deleted it. \n \n are you sure you want to delete this creator?`" :open="areYouSure"/>
</template>