<script setup lang='ts'>

</script>

<template>
    <main class="text-background-text flex screen-size p-3 gap-5">
        <Sidebar></Sidebar>
        <div class="p-6 flex flex-grow bg-background-foreground rounded-3xl">
            <slot></slot>
        </div>
    </main>
</template>