<script setup lang='ts'>
    import PageTitle from "~/components/Core/PageTitle.vue";
    import {onMounted} from "vue";
    import {appSettings} from "~/src/GlobalSettings";
    const {user} = useOidcAuth();
</script>

<template>
    <section class="w-full h-full">
        <div class="flex h-fit justify-between items-center w-full">
            <PageTitle :title="'hey, ' + user?.userInfo?.nickname" sub-title="thursday, oct 24, 2024"></PageTitle>
            <div class="flex gap-3">
                <button class="bg-black py-3 px-6 text-white rounded-lg">request feature</button>
            </div>
        </div>
    </section>
</template>

<style>
tr:hover {
    background-color: #f0f8ff;
    transition: background-color 0.2s ease;
}

@keyframes fadeInUp {
    0% {
        transform: translateY(10%);
        opacity: 0;
    }
    100% {
        transform: translateY(0%);
        opacity: 1;
    }
}

table {
    animation: 1s fadeInUp;
}

.card-1 {
    animation: 1s fadeInUp;
}
.card-2 {
    animation: 1.5s fadeInUp;
}

.card-3 {
    animation: 2s fadeInUp;
}
</style>