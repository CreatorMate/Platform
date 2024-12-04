<script setup lang="ts">
    import { useRoute } from '#imports';
    definePageMeta({
        layout: 'empty'
    })

    // Access the route parameters
    const route = useRoute();
    const brandId = route.params.brand_id;
    const userId = route.params.user_id;
</script>

<template>
    <div>
        <h1>Invitation</h1>
        <p>Brand ID: {{ brandId }}</p>
        <p>User ID: {{ userId }}</p>
    </div>
</template>
