<script setup lang='ts'>
    const {text, speed} = defineProps<{
        text: string,
        speed: number
    }>();
    const emit = defineEmits(['done']);

    const animatedText = ref("");

    async function animateText() {
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                animatedText.value += text[index];
                index++;
            } else {
                clearInterval(interval);
                emit('done');
            }
        }, speed);
    }

    onMounted(async () => await animateText());
</script>

<template>
    <div v-html="animatedText" class=""></div>
</template>