<script setup lang='ts'>
    import {isOn} from "@vue/shared";

    const props = defineProps<{
        disabled: boolean,
        showBack: boolean
    }>()
    const {disabled, showBack} = toRefs(props);
    const emits = defineEmits(["onKeydown", "send", "update:modelValue", "reset"]);

    function keyDown(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            send();
        }
    }

    function send() {
        if (value.value.length == 0) return;
        emits('send', value.value);
        value.value = "";
    }

    let value = ref("");
</script>

<template>
    <div :class="[
        !showBack ? '' : 'pt-2'
    ]"
         class="w-full px-4 md:px-0 flex items-center gap-2 flex-col sticky bottom-0 py-8 backdrop-blur-[8px]">
        <p @click="emits('reset')" class="hover:underline cursor-pointer text-sm" v-if="showBack">go back</p>
        <div class="w-full flex justify-center">
            <div :class="{
           'border-zinc-600': disabled
       }" class="w-full md:w-[532px] flex justify-between items-center">
               <textarea
                   v-model="value"
                   id="onboarding_chat_input"
                   @keydown="keyDown"
                   :disabled="disabled"
                   rows="1"
                   placeholder="type here..."
                   type="text"
                   maxlength="250"
                   :class="{
                       'placeholder-zinc-600': disabled
                   }"
                   class="px-4 py-3 flex flex-grow resize-none outline-0 rounded-l-full border border-r-none bg-opacity-10 text-black placeholder-opacity-40 placeholder-black"/>
                <div class="rounded-r-full border py-4 px-4">
                    <div @click="send"
                         class="arrow-icon cursor-pointer hover:text-opacity-0 text-black text-opacity-40">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <g clip-path="url(#clip0_117_717)">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M12.6047 0.0532033C13.933 -0.115554 14.7217 0.131029 15.2909 0.687212C15.5585 0.948745 15.7776 1.27918 15.8979 1.73044C16.0149 2.16914 16.0305 2.6926 15.945 3.33539C15.7753 4.61008 15.1882 6.48263 13.9797 9.35847C13.1509 11.3308 12.4528 12.9883 11.62 14.086C11.1945 14.6468 10.7093 15.097 10.1185 15.3705C9.52065 15.6473 8.86097 15.7219 8.12667 15.6059C7.5909 15.5212 6.98478 15.2684 6.37814 14.9325L5.69174 15.5421C4.55483 16.5521 2.68832 15.7881 2.68832 14.2278V12.0322C5.53016 9.2999 8.54083 6.81076 11.7813 4.5117C12.103 4.28342 12.1787 3.83756 11.9505 3.51582C11.7222 3.19408 11.2764 3.11831 10.9546 3.34659C7.68654 5.66527 4.6468 8.17496 1.77667 10.927C1.50977 10.588 1.26135 10.2442 1.04075 9.90555C0.553336 9.15728 0.165905 8.38028 0.0553371 7.712C-0.0645269 6.98755 0.0126103 6.33515 0.298897 5.74486C0.580856 5.16351 1.04313 4.68899 1.61521 4.27461C2.73655 3.46237 4.42977 2.78143 6.4491 1.9713C9.39232 0.790493 11.3053 0.218294 12.6047 0.0532033Z"
                                      fill="black" :fill-opacity="value.length != 0 ? 1 : 0.4"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_117_717">
                                    <rect width="16" height="16" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.arrow-icon:hover svg path {
    fill-opacity: 1;
}
</style>