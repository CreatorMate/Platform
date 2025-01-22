<script setup lang='ts'>
    import {onMounted} from "vue";
    import {useRouter} from "#app";
    import {Icon} from "@iconify/vue";

    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    const emit = defineEmits(['verify'])
    const email = ref("");
    const router = useRouter();
    const loading = ref(false);
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const validationError = ref(false);

    onMounted(async () => {
        if(user.value) {
            await router.push('/callback')
        }
    })
    async function withGoogle() {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',

            options: {
                redirectTo: `${window.location.origin}/creators`,
            }
        });
    }

    function isInEmbeddedBrowser() {
        if(!process.client) return;
        let ua = navigator.userAgent.toLowerCase();
        let embeddedBrowsers = [
            "linkedinapp",
            "linkedin",
            "meta",
            "facebook",
            "fban",
            "instagram",
        ]

        for (let embeddedBrowser of embeddedBrowsers) {
            if (ua.includes(embeddedBrowser)) {
                return true;
            }
        }

        return false;
    }

    async function signIn() {
        if(loading.value) return;
        if(!emailRegex.test(email.value)) {
            validationError.value = true;
            return;
        }
        validationError.value = false;
        loading.value = true;
        const response = await supabase.auth.signInWithOtp({email: email.value});
        loading.value = false;
        if(response.error) {
            console.log(response.error)
            return;
        }

        emit('verify', email.value);
    }
</script>

<template>
    <NuxtImg class="w-[64px] h-[28px] mb-6" alt="creatormate logo" src="/logo-light.svg"></NuxtImg>
    <h2 class="text-2xl mb-3 font-medium">welcome to creatormate</h2>
    <p class="mb-4">Login with the email you were invited with.</p>
    <button v-if="!isInEmbeddedBrowser()" @click="withGoogle" class="bg-[#F5F5F5] rounded-lg w-full py-3 text-black font-medium leading-6 hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
        <Icon class="mr-1 pb-1 leading-6 text-black" size="24px" name="ri:google-fill"></Icon>
        continue with google
    </button>
    <div v-if="!isInEmbeddedBrowser()" class="flex items-center w-full">
        <div class="h-[1px] w-full mx-4 bg-[#1B1B1B]"></div>
        <p class="py-4 text-[#1B1B1B]">or</p>
        <div class="h-[1px] w-full mx-4 bg-[#1B1B1B]"></div>
    </div>
    <input @keydown.enter="signIn" v-model="email" placeholder="your@email.com" style="background-color: rgba(255, 255, 255, 0.10)" class="w-full py-3 px-4 text-center rounded-full placeholder-opacity-40 text-black mb-2 outline-0 border border-black focus:shadow-input focus:border focus:border-white" type="email">
    <button @click="signIn" v-if="!loading">continue with email</button>
    <button v-else class="px-3 py-3 rounded-full bg-white bg-opacity-20 w-full mb-6">
        <Icon size="23" name="line-md:loading-loop"></Icon>
    </button>
    <p v-if="validationError" class="mb-6 text-red-500">Please enter a valid email</p>
    <p class="text-white text-opacity-40">already have an account? <span class="text-white font-normal hover:underline cursor-pointer" @click="register = !register">Login here</span></p>
</template>