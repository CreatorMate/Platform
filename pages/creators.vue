<script setup lang='ts'>
    import PageTitle from "~/components/Core/PageTitle.vue";

    const {user} = useOidcAuth();
    console.log(user.value)
</script>

<template>
    <PageTitle title="all creators" sub-title="manage all connections"></PageTitle>
</template>