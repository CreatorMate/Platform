<script setup lang='ts'>
    const emit = defineEmits(['ask'])
    const questions = [
        "what is creator mate?",
        "who is on the creator mate team?",
        "who did the logo design?",
        "how will creator mate help me?",
        "Who is building creator mate?",
        "how can i come in contact with the creator mate team?",
        "who founded creator mate",
    ]
</script>

<template>
    <div class="flex justify-center flex-wrap gap-2 px-6 md:px-32 mt-6">
        <button @click="emit('ask', question)" class="rounded-full px-3 py-1 bg-white bg-opacity-10 hover:bg-opacity-20 text-white text-opacity-80" v-for="question of questions">{{question}}</button>
    </div>
</template>