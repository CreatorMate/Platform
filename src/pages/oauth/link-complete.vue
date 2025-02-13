<script setup lang='ts'>
    import {API} from "~/src/utils/API/API";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";

    const router = useRouter();
    const route = useRoute();

    const code = route.query.code;

    const result: APIResponse<{access_token: string, user_id: number}> = await API.ask('/instagram/login', 'POST', {
        code: code
    });

    console.log(result);

    if(result.success) {
        localStorage.setItem('access_token', result.data.access_token);
        localStorage.setItem('user_id', String(result.data.user_id));

        router.push('/oauth/test-api')
    }



    // const result = await fetch('https://api.instagram.com/oauth/access_token' +
    //     '?client_id=518787711231405' +
    //     '&client_secret=4d48c4af0c5b715943583250fbfe4a8f' +
    //     '&grant_type=authorization_code' +
    //     '&redirect_uri=https://localhost:3000/oauth/link-complete' +
    //     `&code=${code}`, {
    //     method: 'POST',
    //     headers: {
    //         'ACCEPT': "application/json",
    //         'CONTENT_TYPE': "application/json",
    //     }
    // });


    const access_token = ref(localStorage.getItem('access_token'));

</script>

<template>
    <div class="flex flex-col gap-6">
        <p>{{code}}</p>
        <p>{{access_token}}</p>
    </div>
</template>