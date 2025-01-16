<script setup lang='ts'>
    import {Icon} from "@iconify/vue";
    import type {NavItem} from "./NavItem";
    import {onMounted} from "vue";

    const {name, iconName, linkTo, children, premium} = defineProps<{
        name: string,
        iconName: string,
        linkTo: string,
        premium: boolean
        children: NavItem[]
    }>();
    const route = useRoute();

    const isHoveringParent = ref(false)
    const show = ref(false)
    function isActive(path: string) {
        return route.fullPath === path;
    }

    watch(route, () => {
        for (const child of children) {
            if(isActive(child.linkTo)) {
                show.value = true;
                break;
            }
        }
    })


</script>

<template>
    <div @mouseenter="isHoveringParent = true" @mouseleave="isHoveringParent = false" :class="{
        'bg-[#E2E2E2] text-text-dark' : isActive(linkTo) && children.length === 0
    }" @click="show = !show" class="flex py-3 px-5 items-center justify-between cursor-pointer rounded-xl">
        <div :class="{'translate-x-4': isHoveringParent}" class="flex items-center gap-3 transition duration-100">
            <Icon width="20" :icon="iconName"/>
            <nuxt-link class="text-sm" :to="linkTo">{{name}}</nuxt-link>
        </div>
        <div class="bg-background-foreground rounded-2xl py-1 px-4" v-if="premium">
            <p class="text-xs ">upgrade</p>
        </div>
        <div v-else-if="children.length > 0">
            <Icon :class="{'rotate-180': show}" icon="solar:alt-arrow-down-line-duotone" />
        </div>

    </div>
    <div class="text-sm ml-7 pl-4 border-l border-black border-opacity-20 flex flex-col" v-if="show">
        <nuxt-link :class="{
           'bg-background-foreground text-text-dark border border-black border-opacity-10': isActive(child.linkTo)
        }" :to="child.linkTo" class="py-3 px-5 rounded-3xl border-black border-opacity-10" v-for="child of children">
            {{child.name}}
        </nuxt-link>
    </div>

</template>