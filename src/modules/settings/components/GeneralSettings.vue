<script setup lang='ts'>
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    import {getSupabaseClient} from "~/src/utils/Supabase/SupabaseClient";
    import {onMounted} from "vue";
    import {API} from "~/src/utils/API/API";

    const {user} = useOidcAuth();
    const accountState = useAccountStore();
    const files = ref();
    const imageLink = ref("");
    const image = ref("");
    const fileInput = ref(null);

    const email = ref("");
    const fullName = ref("");

    onMounted(() => {
        if (!accountState.user) return;

        email.value = accountState.user.email;
        fullName.value = accountState.user.full_name;
    });

    async function selectImage(evt: any) {
        files.value = evt.target.files;
        imageLink.value = URL.createObjectURL(evt.target.files[0])
        image.value = evt.target.files[0];

        await save()
    }

    async function syncBrand() {
        await API.ask(`/creator_api/sync/instagram?brandId=${accountState.user?.brands.id}`);
    }

    async function save() {
        const supabase = await getSupabaseClient();
        if (imageLink.value && !image.value) {
            return;
        }
        if (!accountState.user) return;
        if (!image.value) return;
        const file = image.value;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`
        const {error: uploadError, data} = await supabase.storage.from('user_pictures').upload(filePath, file);
        if (uploadError || !data || !user.value) {
            return;
        }
        if (accountState.user.picture) {
            //@todo remove old
            await supabase.storage.from('user_pictures').remove([accountState.user.picture]);
        }
        accountState.user.picture = data.path;
        await accountState.save();
    }

    async function deleteFoto() {
        if (!accountState.user) return;
        const supabase = await getSupabaseClient();
        await supabase.storage.from('user_pictures').remove([accountState.user.picture]);
        accountState.user.picture = "";
        await accountState.save();
    }

    async function saveInput() {
        if (!accountState.user) return;
        if (accountState.user.email == email.value && accountState.user.full_name == fullName.value) return;
        accountState.user.email = email.value;
        accountState.user.full_name = fullName.value

        await accountState.save();
    }

</script>

<template>
    <div class="general-settings">
        <!--        <div class="w-full py-8 border-b border-gray-500 border-opacity-10 flex items-center ">-->
        <!--            <div class="w-[350px] pr-10">-->
        <!--                <p class="text-text-normal font-semibold">Your photo</p>-->
        <!--                <p class="font-semibold text-sm">This will be displayed on your profile.</p>-->
        <!--            </div>-->
        <!--            <div class="flex items-center gap-3 font-semibold">-->
        <!--                <nuxt-img class="rounded-xl w-16 h-16"-->
        <!--                          :src="accountState.user?.picture ? 'https://mfouoyeneddsfujxfjci.supabase.co/storage/v1/object/public/user_pictures/' + accountState.user.picture : user.userInfo.picture"></nuxt-img>-->
        <!--                <input ref="fileInput" type="file" accept="image/*" @change="selectImage" style="display: none"/>-->
        <!--                <button :disabled="!accountState.user?.picture" class="hover:underline transition duration-200"-->
        <!--                        @click="deleteFoto">Delete-->
        <!--                </button>-->
        <!--                <button @click="fileInput.click()" class="text-blue-700 hover:text-blue-900 transition duration-200">-->
        <!--                    Update-->
        <!--                </button>-->
        <!--            </div>-->
        <!--        </div>-->
        <!--        <div class="w-full py-3 border-b border-gray-500 border-opacity-10 flex flex-col justify-center gap-3">-->
        <!--            <div class="flex items-center w-full">-->
        <!--                <p class="text-text-normal font-semibold w-[350px]">Username</p>-->
        <!--                <input @focusout="saveInput" v-model="fullName"-->
        <!--                       class="flex flex-grow shadow px-6 py-2 rounded-3xl border border-black border-opacity-20"-->
        <!--                       type="text"/>-->
        <!--            </div>-->
        <!--            <div class="flex items-center w-full">-->
        <!--                <p class="text-text-normal font-semibold w-[350px]">Email</p>-->
        <!--                <input @focusout="saveInput" v-model="email"-->
        <!--                       class="flex flex-grow shadow px-6 py-2 rounded-3xl border border-black border-opacity-20"-->
        <!--                       type="text"/>-->
        <!--            </div>-->
        <!--        </div>-->
        <div class="w-full py-3 border-b border-gray-500 border-opacity-10 flex flex-col justify-center gap-3 mt-6">
            <div class="flex items-center w-full gap-12">
                <div class="flex flex-col">
                    <p class="text-text-normal font-semibold">Data sync</p>
                    <p class="font-semibold text-sm">Request a data sync for your brand</p>
                </div>
                <div>
                    <button @click="syncBrand" class="py-2 px-12 bg-black rounded-lg text-white">Request sync</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.general-settings {
    animation: 1s fadeInUp;
}
</style>