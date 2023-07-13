<template>
    <div>{{ title }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const title = ref("remote 404");
</script>

<style scoped lang="less">
div {
    font-size: 20px;
}
</style>
