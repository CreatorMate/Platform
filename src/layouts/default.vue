<script setup lang='ts'>

import Sidebar from "~/src/components/Sidebar/Sidebar.vue";
</script>

<template>
    <main class="text-background-text flex screen-size p-3 gap-5">
        <Sidebar></Sidebar>
        <div class="p-6 flex flex-grow bg-background-foreground rounded-3xl overflow-y-scroll">
            <slot></slot>
        </div>
    </main>
</template>