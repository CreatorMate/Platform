<script setup lang='ts'>
    import {Icon} from "@iconify/vue";
    import type {NavItem} from "./NavItem";
    import {onMounted} from "vue";
    import {useAccountState} from "~/src/utils/Auth/AccountState";

    const {name, iconName, linkTo, premium, status} = defineProps<{
        name: string,
        iconName: string,
        linkTo: string,
        premium: boolean,
        status?: string
    }>();
    const route = useRoute();

    const accountState = useAccountState();

    const isHoveringParent = ref(false)
    const show = ref(false)
    function isActive(path: string) {
        return route.fullPath === path || !accountState.brand?.is_premium;
    }

</script>

<template>
    <NuxtLink :to="linkTo" @mouseenter="isHoveringParent = true" @mouseleave="isHoveringParent = false" :class="{
        'bg-[#E2E2E2] text-text-dark' : isActive(linkTo)
    }" @click="show = !show" class="flex py-3 px-5 items-center cursor-pointer rounded-xl">
        <div :class="{'translate-x-4': isHoveringParent}" class="flex items-center gap-3 transition duration-100">
            <Icon width="20" :icon="iconName"/>
            <p class="text-sm">{{name}}</p>
        </div>
        <div class="bg-background-foreground rounded-2xl border py-1 px-4 ml-6" v-if="status">
            <p class="text-xs ">{{status}}</p>
        </div>
        <div class="bg-background-foreground rounded-2xl py-1 px-4 ml-2" v-if="premium">
            <p class="text-xs ">premium</p>
        </div>
    </NuxtLink>
</template>