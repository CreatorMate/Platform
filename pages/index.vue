<script setup>
    import {Icon} from "@iconify/vue";
    import {useColorMode} from "@vueuse/core";
    const colorMode = useColorMode();
    const {logout} = useOidcAuth();
</script>
<template>
    <div class="relative ">
        <Icon @click="colorMode = 'dark'"
              icon="radix-icons:moon"
              class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
        <Icon @click="colorMode = 'light'"
              icon="radix-icons:sun"
              class="absolute h-[1.2rem] top-0 w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
    </div>
</template>