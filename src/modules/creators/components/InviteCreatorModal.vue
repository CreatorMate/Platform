<script setup lang='ts'>
    import {Icon} from "@iconify/vue";
    import type {Ref} from "vue";

    const emits = defineEmits(['close', 'submitted']);
    const emails: Ref<string[]> = ref([]);
    const validEmail = ref(true);
    const email = ref("");
    const fileInput = ref(null);
    const invalidCsvFormat = ref(false);
    const loading = ref(false);

    function addToList() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(email.value)) {
            validEmail.value = true;
            emails.value.push(email.value);
            email.value = "";
        } else {
            validEmail.value = false;
        }
    }

    async function handleFileUpload (event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const fileContent = await file.text();
        const normalizedContent = fileContent.replace(/\r/g, "\n ");
        const rows = normalizedContent.split("\n").map((row) => row.trim());

        console.log(rows)
        for (const row of rows) {
            if (!row) continue; // Skip empty rows
            emails.value.push(row);
        }
    }

    function removeFromList(toRemove: string) {
        emails.value = emails.value.filter((current) => current != toRemove);
    }

    async function sendInvite() {
        loading.value = true;
        const result = await $fetch('/api/emails/inviteCreators', {
            method: 'POST',
            body: JSON.stringify({
                emails: emails.value
            })
        });
        loading.value = false;
        emits('submitted');
    }

</script>

<template>
    <div class="p-10 bg-background-foreground w-[512px] flex flex-col rounded-xl text-text-dark text-sm">
        <h1 class="text-lg mb-1">invite creators to your workspace</h1>
        <p class=" text-black text-opacity-30">this workspace is private, only select members and roles can use this
            workspace. this workspace is opted out of training.</p>
        <div class="mt-12 flex">
            <div>
                <p class="mb-1.5">import from csv</p>
                <p class="text-black text-opacity-30">the file must include email and opptional role on each line. roles
                    can be "member", "admin" or "owner". show example</p>
            </div>
            <button @click="fileInput.click()"
                class="border border-black border-opacity-30 py-2 px-3 rounded ml-4 h-fit text-black text-opacity-80">
                upload
            </button>
            <input ref="fileInput" type="file" accept=".csv" @change="handleFileUpload" style="display: none"/>
        </div>
        <p class="mt-3 ">email</p>
        <div class="bg-background mt-2 rounded-lg flex flex-wrap text-xs gap-1 p-3">
            <div v-for="email of emails" class="bg-background-foreground px-3 py-2 flex gap-2 rounded-full border border-black border-opacity-20">
                <p>{{email}}</p>
                <Icon class="cursor-pointer" @click="removeFromList(email)" width="16" icon="si:close-duotone"></Icon>
            </div>
            <input v-model="email" @keydown.enter="addToList" class="bg-background flex-grow outline-none px-3 py-2">
        </div>
        <p v-if="!validEmail" class="text-red-500 mt-2">must be valid email</p>
        <p v-if="invalidCsvFormat" class="text-red-500 mt-2">csv must be in the right format</p>
        <div class="mt-5 flex items-center gap-2">
            <input class="w-4 h-4" id="resend" type="checkbox" name="resend">
            <label for="resend">resend emails for existing invites</label>
        </div>
        <div class="mt-9 flex gap-3 items-center text-black text-opacity-30 ml-4">
            <Icon width="23" height="30" icon="mage:message-information"></Icon>
            <p class="text-sm ">users that accept invited will be included as additional seats
                on your next invoice.</p>
        </div>
        <div class="mt-12 flex justify-end gap-2">
            <button @click="emits('close')" class="border border-black border-opacity-30 py-2 px-3 rounded h-fit text-black text-opacity-80">
                cancel
            </button>
            <button @click="sendInvite" :disabled="emails.length == 0" class="border text-white border-green-700 bg-green-600 border-opacity-30 py-2 px-3 rounded h-fit flex items-center gap-1">
                next
                <Icon v-if="loading" icon="line-md:loading-loop"></Icon>
            </button>
        </div>
    </div>
</template>