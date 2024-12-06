<script setup lang='ts'>
    import PageTitle from "~/components/Core/PageTitle.vue";
    import {Icon} from "@iconify/vue";
    import InviteCreatorModal from "~/src/modules/creators/components/InviteCreatorModal.vue";
    import {onMounted, type Ref} from "vue";
    import type {Creator} from "~/server/types/SupabaseTypes";
    import {Paginator} from "~/src/utils/Pagination/Paginator";
    import CreatorsTable from "~/src/modules/creators/components/CreatorsTable.vue";
    import CreatorCountBlock from "~/src/modules/creators/components/CreatorCountBlock.vue";
    import CreatorOverviewFilters from "~/src/modules/creators/components/CreatorOverviewFilters.vue";
    import TablePaginator from "~/components/Paginator/TablePaginator.vue";

    const {user} = useOidcAuth();
    const open = ref(false);

    const newCreators = ref(0);

    const loading = ref(true);
    const brand = 1;
    const paginator = new Paginator<Creator>('/api/creators/brandCreators', `&brand=${brand}`, loading);

    onMounted(async () => {
        await paginator.getContent();
    });

    async function closeModal() {
        open.value = false
    }

    async function invitedUsers() {
        paginator.page.value = 1;
        open.value = false
        await paginator.getContent();
    }
</script>

<template>
    <section class="w-full h-full flex-grow flex flex-col">
        <div class="flex h-fit justify-between items-center w-full">
            <PageTitle title="all creators" sub-title="manage all connections"></PageTitle>
            <div class="flex gap-3">
                <button class="bg-background py-3 px-6 text-text-dark rounded-lg">export</button>
                <button @click="open = true" class="bg-black py-3 px-6 text-white rounded-lg">invite creator</button>
            </div>
        </div>
        <div class="flex items-center mt-3 gap-3">
            <CreatorCountBlock :number="paginator.total.value" name="total creators"/>
            <CreatorCountBlock :number="0" name="new creators"/>
            <CreatorCountBlock :number="0" name="active creators"/>
        </div>
        <CreatorOverviewFilters/>
        <div v-if="loading" class="flex flex-grow justify-center items-center">
            <Icon width="64" v-if="loading" icon="line-md:loading-loop"></Icon>
        </div>
        <CreatorsTable @refresh="paginator.getContent()" v-else :creators="paginator.items"></CreatorsTable>
        <div v-if="paginator.items.value.length === 0 && !loading" class="flex flex-grow justify-center items-center">
            You haven't added any creators yet, <span @click="open = true" class="pl-1 underline cursor-pointer">add them now</span>
        </div>
    <TablePaginator v-else :paginator/>
    </section>
    <modal-popup @close="closeModal" :model-active="open">
        <InviteCreatorModal @submitted="invitedUsers" @close="closeModal"/>
    </modal-popup>
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