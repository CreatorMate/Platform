<script setup lang='ts'>
    import {Icon} from "@iconify/vue";
    import type {NavItem} from "./NavItem";

    const {name, iconName, linkTo, children, premium} = defineProps<{
        name: string,
        iconName: string,
        linkTo: string,
        premium: boolean
        children: NavItem[]
    }>();

    const show = ref(false)
</script>

<template>
    <div @click="show = !show" class="flex py-3 px-5 items-center justify-between cursor-pointer">
        <div class="flex items-center gap-3">
            <Icon width="20" :icon="iconName"/>
            <nuxt-link class="text-sm" :to="linkTo">{{name}}</nuxt-link>
        </div>
        <div class="bg-background-foreground rounded-2xl py-1 px-4" v-if="premium">
            <p class="text-xs ">upgrade</p>
        </div>
        <Icon :class="{'rotate-180': show}" v-else-if="children.length > 0" icon="solar:alt-arrow-down-line-duotone" />
    </div>
    <div class="text-sm ml-7 pl-4 border-l border-black border-opacity-20 flex flex-col" v-if="show">
        <nuxt-link :to="linkTo" class="py-3 px-5 first-of-type:bg-white rounded-3xl first-of-type:text-text-dark first-of-type:border border-black border-opacity-10" v-for="child of children">
            {{child.name}}
        </nuxt-link>
    </div>

</template>