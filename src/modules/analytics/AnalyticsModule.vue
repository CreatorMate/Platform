<script setup lang='ts'>
    import {API} from "~/src/utils/API/API";
    import PageTitle from "~/src/components/Core/PageTitle.vue";
    const asked = ref(false);
    const success = ref(true);

    onMounted(async () => {
        const check = await API.ask('/creator_api/check');
        console.log(check);
        asked.value = true;
        success.value = check.success
    })
</script>

<template>
    <RouterView v-if="asked && success"/>
    <div v-else-if="asked && !success">
        <PageTitle title="page offline" sub-title="the server that is supplying the creator data is under maintenance try again later"></PageTitle>
    </div>
</template>