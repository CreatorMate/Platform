<script setup lang='ts'>
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import {useToastState} from "~/src/utils/Toast/ToastState";
    import {API} from "~/src/utils/API/API";

    const route = useRoute();
    const router = useRouter();

    const accountState = useAccountState();
    const toastState = useToastState();

    const {code, error} = route.query;

    if(error) {
        toastState.addToast('something went wrong while connecting instagram account, try again later...', false);
    }

    if(code) {
        const request = await API.ask('/creator_api/brands/brand_id/instagram', 'POST', {
            code: code
        });
        await accountState.initialize();
    }

    await router.replace('/settings');
</script>

<template>
    linking!
</template>