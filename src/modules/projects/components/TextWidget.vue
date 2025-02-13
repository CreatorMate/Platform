<template>
    <div class="markdown-editor">
        <textarea
            v-model="markdownText"
            @change="updateText"
            class="editor flex"
            contenteditable="true">
            <p>this has some great content</p>
        </textarea>
        <div class="prose prose-lg mt-4 border p-4 rounded-lg shadow-md bg-white">
            <vue-markdown-it :source="markdownText" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { VueMarkdownIt } from '@f3ve/vue-markdown-it';
    import { ref } from 'vue';

    const markdownText = ref('');

    onMounted(() => {
        markdownText.value = localStorage.getItem('markdown-text') ?? '';
    })

    function updateText() {
        localStorage.setItem('markdown-text', markdownText.value);
    }

</script>

<style>

.prose h1 {
    font-size: 32px;
}

.prose h2 {
    font-size: 28px;
}

.prose h3 {
    font-size: 32px;
}

.prose ol {
    list-style: decimal;
    padding-left: 20px;
}

.prose ul {
    list-style: disc;
    padding-left: 20px;
}

.markdown-editor {
    display: flex;
    flex-direction: column;
}

</style>
