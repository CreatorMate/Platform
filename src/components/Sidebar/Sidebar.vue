<script setup lang='ts'>
    import NavButton from "~/src/components/Sidebar/NavButton.vue";
    import type {NavItem} from "~/src/components/Sidebar/NavItem";
    import ProjectButton from "~/src/components/Sidebar/ProjectButton.vue";
    import {Icon} from "@iconify/vue";
    import {useAccountState} from "~/src/utils/Auth/AccountState";

    const {user} = useOidcAuth();
    const accountState = useAccountState();


</script>

<template>
    <aside class="h-full min-w-[290px] w-[290px] max-h-screen flex flex-col overflow-auto">
        <NuxtImg class="mt-8 ml-4" width="48" src="/logo-light.svg"/>
        <nav v-if="accountState.brand && accountState.brand.is_premium" class="mt-7 flex flex-col flex-grow">
            <p class="text-sm p-3 text-[#616161]">general</p>
            <NavButton :premium="false" link-to="/"
                       name="creators" icon-name="material-symbols:supervisor-account-outline-rounded"/>
            <NavButton :premium="false" link-to="/analytics"
                       name="analytics" icon-name="material-symbols:bar-chart-4-bars"/>
            <NavButton :premium="false" link-to="/content"
                       name="content" icon-name="material-symbols:animated-images-outline"/>
            <NavButton status="alpha" v-if="accountState.user?.email == user?.userInfo?.email" :premium="false"
                       link-to="/chat"
                       name="chat" icon-name="material-symbols:chat-bubble-outline"/>
            <NavButton :premium="false" link-to="/settings" name="settings" icon-name="uil:cog" :children="[]"/>
            <ProjectButton/>
            <NavButton :premium="false" link-to="/metrics"
                       name="metric catalog" icon-name="material-symbols:folder-outline"/>
            <NavButton :premium="false" link-to="/widgets"
                       name="widgets" icon-name="material-symbols:folder-outline"/>
            <div class="mt-auto flex flex-col gap-3">
                <LazySidebarSbUserSession/>
            </div>
        </nav>
        <nav v-else-if="accountState.brand && !accountState.brand.is_premium"
             class="mt-7 flex flex-col flex-grow gap-2">
            <p class="text-sm pl-2">general</p>
            <NavButton :premium="false" link-to="/settings" name="settings" icon-name="uil:cog" :children="[]"/>
            <div class="mt-auto flex flex-col">
                <LazySidebarSbUserSession/>
            </div>
        </nav>
    </aside>
</template>