<script setup lang='ts'>
    let model = defineModel();
    const options = ['General', 'Brand', 'Payment', 'Preferences']
</script>

<template>
    <div class="w-full bg-background p-0.5 rounded-full mt-6 gap-1 flex ">
        <button
            v-for="option of options"
            @click="model = option"
            :class="{'text-text-dark bg-background-foreground border border-opacity-10 border-black': model == option}"
            class="rounded-full font-semibold text-lg px-12 py-2 ">
            {{option}}
        </button>
    </div>
</template>