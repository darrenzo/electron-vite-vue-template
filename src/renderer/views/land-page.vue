<template>
    <h2>
        {{ title }}
    </h2>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTemplateStore } from "../store";
const title = ref("land-page");
const templateStore = useTemplateStore();
templateStore.setCrrRouteName(title.value);
</script>

<style scoped lang="less">
h2 {
    font-size: 20px;
}
</style>
