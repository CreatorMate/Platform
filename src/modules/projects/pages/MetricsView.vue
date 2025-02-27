<script setup lang='ts'>
    import {API} from "~/src/utils/API/API";

    const metrics = (await API.ask('/metrics')).data;
</script>

<template>
    {{metrics}}
</template>