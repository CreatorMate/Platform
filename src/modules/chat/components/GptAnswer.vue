<script setup lang='ts'>

    import type {ChatMessage} from "~/src/modules/chat/types/ChatTypes";
    import {Icon} from "@iconify/vue";
    import AnimatedText from "~/src/modules/chat/components/AnimatedText.vue";
    import {API} from "~/src/utils/API/API";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import ChatTable from "~/src/modules/chat/components/ChatTable.vue";
    import type {Ref} from "vue";

    const loading = ref(true)
    const error = ref(false)
    let text = "";
    const speed = 5;
    let observer: ResizeObserver;
    const elementRef = ref<HTMLElement | null>(null);
    let isTable = ref(false);
    let sections: Ref<{type: string, data: any}[]> = ref([]);

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
        const response: APIResponse<{response: string, using: any}|{sections: {type: string, data: any}[]}> = await API.ask('/creator_api/ask', 'POST', {
            question: question.message
        });

        if (!response.success) {
            error.value = true;
            loading.value = false;
            return;
        }
        if ('sections' in response.data) {
            sections.value.push(...response.data.sections);
            console.log(sections.value)
            loading.value = false;
            done();
        } else if ('response' in response.data) {
            if(response.data.response) {
                text = cleanUp(JSON.stringify(response.data.response));
                done();
            } else {
                text = cleanUp(JSON.stringify(response.data.using));
                isTable.value = true;
                done();
            }
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
        <AnimatedText v-else-if="!error && !isTable && text" @done="done" :text="text" :speed="speed"></AnimatedText>
        <ChatTable v-else-if="!error && sections.length > 0" :sections></ChatTable>
        <p v-else>something went wrong</p>
    </div>
</template>

<style scoped>
 table {
     border: solid darkgray 1px;
 }
</style>