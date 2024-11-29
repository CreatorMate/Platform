<script setup lang='ts'>
    import NavButton from "~/components/Sidebar/NavButton.vue";
    import type {NavItem} from "~/components/Sidebar/NavItem";

    const navItems: NavItem[] = [{
        linkTo: '/',
        name: 'home',
        iconName: 'fluent:home-20-regular',
        children: [],
        premium: false
    },{
        linkTo: '/creators',
        name: 'creators',
        iconName: 'lineicons:user-4',
        children: [
            {
                linkTo: '/creators',
                name: 'all creators',
                iconName: 'lineicons:user-4',
                children: [],
                premium: false
            },
            {
                linkTo: '/creators/partnerships',
                name: 'parrtnerships',
                iconName: 'lineicons:user-4',
                children: [],
                premium: false
            }
        ],
        premium: false
    },{
        linkTo: '/analytics',
        name: 'analytics',
        iconName: 'uil:analytics',
        children: [],
        premium: false
    },{
        linkTo: '/outliers',
        name: 'outliers',
        iconName: 'ion:analytics',
        children: [],
        premium: true
    }]
</script>

<template>
    <nav class="mt-7 flex flex-col flex-grow">
        <NavButton v-for="navItem of navItems" :premium="navItem.premium" :link-to="navItem.linkTo" :name="navItem.name" :icon-name="navItem.iconName" :children="navItem.children"/>
        <div class="mt-auto">
            <NavButton :premium="false" link-to="/settings" name="settings" icon-name="uil:cog" :children="[]"/>
            <NavButton :premium="false" link-to="/help" name="help & support" icon-name="mingcute:question-line" :children="[]"/>
        </div>
    </nav>
</template>