<template>
    <h2>
        {{ title }}
    </h2>
</template>

<script setup lang="ts">
import { ref } from "vue";
const title = ref("other-page");
</script>

<style scoped lang="less">
h2 {
    font-size: 20px;
}
</style>
