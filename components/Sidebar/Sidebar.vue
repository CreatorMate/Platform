<script setup lang='ts'>
    import {Icon} from "@iconify/vue";
    import {onMounted} from "vue";
    import SbUserSession from "~/components/Sidebar/SbUserSession.vue";
    import SbSearch from "~/components/Sidebar/SbSearch.vue";
    import SbNavigation from "~/components/Sidebar/SbNavigation.vue";
    import {SupabaseClient} from "@supabase/supabase-js";
    import {getSupabaseClient} from "~/src/utils/Supabase/SupabaseClient";
    import {useAccountStore} from "~/src/utils/Auth/AccountStore";

    const {user, logout, fetch} = useOidcAuth();

</script>

<template>
    <aside class="h-full w-[290px] flex flex-col flex flex-col">
        <SbUserSession/>
        <SbSearch/>
        <SbNavigation/>
        <p @click="logout()">logout</p>
    </aside>
</template>