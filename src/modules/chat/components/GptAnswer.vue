<script setup lang='ts'>

    import type {ChatMessage} from "~/src/modules/chat/types/ChatTypes";
    import {Icon} from "@iconify/vue";
    import AnimatedText from "~/src/modules/chat/components/AnimatedText.vue";
    import {API} from "~/src/utils/API/API";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";

    const loading = ref(true)
    const error = ref(false)
    let text = "";
    const speed = 5;
    let observer: ResizeObserver;
    const elementRef = ref<HTMLElement | null>(null);

    const emit = defineEmits(['done', 'resize']);

    const {question} = defineProps<{
        question: ChatMessage
    }>();

    onMounted(async () => {
        if (question.type == 'start') {
            text = question.message
            loading.value = false;
            return;
        }
        ;
        const response: APIResponse<{response: string, using: any}> = await API.ask('/creator_api/ask', 'POST', {
            question: question.message
        });

        if (!response.success) {
            error.value = true;
            loading.value = false;
            return;
        }

        if(response.data.response) {
            text = cleanUp(JSON.stringify(response.data.response));
        } else {
            text = cleanUp(JSON.stringify(response.data.using));
        }

        loading.value = false;
    });

    function cleanUp(str: string): string {
        // Remove the Markdown code block indicators
        let text = str.replace(/```html/g, '').replace(/```/g, '').trim();

        // Replace \n with actual newlines
        text = text.replace(/\\n/g, '\n');

        // Remove any remaining escape characters
        text = text.replace(/\\"/g, '"');

        return text;
    }

    onMounted(() => {
        observer = new ResizeObserver(() => {
            emit('resize')
        })
        if (elementRef.value) {
            observer.observe(elementRef.value);
        }
    })

    onBeforeUnmount(() => {
        observer.disconnect();
    })

    function done() {
        observer.disconnect()
        emit('done');
    }
</script>

<template>
    <div ref="elementRef" class="w-full">
        <Icon class="text-gray-400" size="30px" v-if="loading" name="eos-icons:three-dots-loading"></Icon>
        <AnimatedText v-else-if="!error" @done="done" :text="text" :speed="speed"></AnimatedText>
    </div>
</template>

<style scoped>
 table {
     border: solid darkgray 1px;
 }
</style>