<script setup lang='ts'>
    import CreatorLoginScreen from "~/src/modules/creators/components/CreatorLoginScreen.vue";
    import CreatorVerifyScreen from "~/src/modules/creators/components/CreatorVerifyScreen.vue";

    const verifying = ref(false);
    const email = ref("");

    function verify(value: string) {
        email.value = value;
        verifying.value = true;
    }
</script>

<template>
    <div class="box">
        <CreatorLoginScreen v-if="!verifying" @verify="verify"/>
        <CreatorVerifyScreen v-else :email="email" />
    </div>
</template>

