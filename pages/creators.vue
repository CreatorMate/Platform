<script setup lang='ts'>
    import PageTitle from "~/components/Core/PageTitle.vue";
    import {Icon} from "@iconify/vue";

    const {user} = useOidcAuth();

    const creators = [
        {
            name: "jens glerum",
            status: "churned",
            email: "jens.glerum@gmail.com",
            type: 1,
            start_date: "15 feb 2024",
            country: "netherlands"
        },
        {
            name: "jens glerum",
            status: "retained",
            email: "jens.glerum@gmail.com",
            type: 1,
            start_date: "15 feb 2024",
            country: "netherlands"
        },
        {
            name: "jens glerum",
            status: "acquired",
            email: "jens.glerum@gmail.com",
            type: 1,
            start_date: "15 feb 2024",
            country: "netherlands"
        },
        {
            name: "jens glerum",
            status: "pending",
            email: "jens.glerum@gmail.com",
            type: 1,
            start_date: "15 feb 2024",
            country: "netherlands"
        },
        {
            name: "jens glerum",
            status: "churned",
            email: "jens.glerum@gmail.com",
            type: 1,
            start_date: "15 feb 2024",
            country: "netherlands"
        },
        {
            name: "jens glerum",
            status: "retained",
            email: "jens.glerum@gmail.com",
            type: 1,
            start_date: "15 feb 2024",
            country: "netherlands"
        },
        {
            name: "jens glerum",
            status: "retained",
            email: "jens.glerum@gmail.com",
            type: 1,
            start_date: "15 feb 2024",
            country: "netherlands"
        },
        {
            name: "jens glerum",
            status: "churned",
            email: "jens.glerum@gmail.com",
            type: 1,
            start_date: "15 feb 2024",
            country: "netherlands"
        },
        {
            name: "jens glerum",
            status: "retained",
            email: "jens.glerum@gmail.com",
            type: 1,
            start_date: "15 feb 2024",
            country: "netherlands"
        },
    ]
</script>

<template>
    <section class="w-full h-full">
        <div class="flex h-fit justify-between items-center w-full">
            <PageTitle title="all creators" sub-title="manage all connections"></PageTitle>
            <div class="flex gap-3">
                <button class="bg-background py-3 px-6 text-text-dark rounded-lg">export</button>
                <button class="bg-black py-3 px-6 text-white rounded-lg">invite creator</button>
            </div>
        </div>
        <div class="flex items-center mt-3 gap-3">
            <div class="flex items-center gap-6 p-2 pr-20 bg-background-foreground border border-background rounded-lg card-1">
                <Icon width="32" icon="lineicons:users"></Icon>
                <div class="flex flex-col">
                    <p class="text-sm">total creators</p>
                    <p class="text-lg font-semibold text-text-dark">101</p>
                </div>
            </div>
            <div class="flex items-center gap-6 p-2 pr-20 bg-background-foreground border border-background rounded-lg card-2">
                <Icon width="32" icon="lineicons:users"></Icon>
                <div class="flex flex-col">
                    <p class="text-sm">new creators</p>
                    <p class="text-lg font-semibold text-text-dark">101</p>
                </div>
            </div>
            <div class="flex items-center gap-6 p-2 pr-20 bg-background-foreground border border-background rounded-lg card-3">
                <Icon width="32" icon="lineicons:users"></Icon>
                <div class="flex flex-col">
                    <p class="text-sm text-text-normal">active creators</p>
                    <p class="text-lg font-semibold text-text-dark">101</p>
                </div>
            </div>
        </div>
        <div class="mt-6 flex gap-3">
            <div class="flex items-center gap-6 p-2 pr-20 bg-background-foreground border border-background rounded-lg">
                <p class="text-sm text-text-normal">search</p>
            </div>
            <div class="flex items-center gap-6 p-2 bg-background-foreground border border-background rounded-lg">
                <p class="text-sm text-text-normal">filter</p>
            </div>
            <div class="flex items-center gap-6 p-2 bg-background-foreground border border-background rounded-lg">
                <p class="text-sm text-text-normal">sort</p>
            </div>
        </div>
        <table class="w-full text-left text-sm">
            <tr class="h-16 border-b border-black border-opacity-10 text-text-light">
                <th class="w-12">
                    <div class="w-4 h-4 border"></div>
                </th>
                <th class="font-normal">name</th>
                <th class="font-normal">status</th>
                <th class="font-normal">email address</th>
                <th class="font-normal">type</th>
                <th class="font-normal">start date</th>
                <th class="font-normal">country</th>
            </tr>
            <tr class="h-16 border-b border-black border-opacity-10 text-text-dark" v-for="creator of creators">
                <td class="w-12">
                    <div class="w-4 h-4 border"></div>
                </td>
                <td>{{ creator.name }}</td>
                <td>
                    <p class="px-2.5 py-1 rounded w-fit" :class="{
                    'bg-green-100 text-green-600': creator.status == 'retained',
                    'bg-red-100 text-red-600': creator.status == 'churned',
                    'bg-blue-100 text-blue-600': creator.status == 'acquired',
                    'bg-yellow-100 text-yellow-600': creator.status == 'pending',
                }">{{ creator.status }}</p></td>
                <td>{{ creator.email }}</td>
                <td>
                    <p class="px-2.5 py-1 rounded w-fit bg-black bg-opacity-5">
                        commision
                    </p>
                </td>
                <td>{{ creator.start_date }}</td>
                <td>{{ creator.country }}</td>
            </tr>
        </table>
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