<script setup lang='ts'>
    import {Icon} from "@iconify/vue";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";
    const {user} = useOidcAuth();
    const accountState = useAccountStore();
</script>

<template>
    <div class="bg-background-foreground rounded-3xl p-2 flex justify-between items-center text-text-light border border-background">
        <div class="flex gap-4 items-center">
            <nuxt-img v-if="accountState.user.picture" class="rounded-xl w-12 h-12" :src="'https://mfouoyeneddsfujxfjci.supabase.co/storage/v1/object/public/user_pictures/' + accountState.user.picture "></nuxt-img>
            <nuxt-img v-else class="rounded-xl w-12 h-12" :src="user.userInfo.picture"></nuxt-img>
            <div class="flex flex-col">
                <p class="text-xs">creatormate</p>
                <p class="text-sm text-text-dark">{{accountState.user?.full_name ?? user.userInfo.nickname }}</p>
            </div>
        </div>
        <Icon class="mr-4" icon="fluent-mdl2:chevron-unfold-10"></Icon>
    </div>
</template>