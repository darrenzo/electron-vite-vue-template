<template>
    <h2>
        {{ title }}
    </h2>
    <h4>
        {{ dependencies?.demo }}
    </h4>
    <h4>
        {{ dependencies?.anyObject.val }}
    </h4>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { useTemplateStore } from "../store";
import { injectedDependenciesKey } from "../provider";

const title = ref("remote-land-page");
const templateStore = useTemplateStore();
templateStore.setCrrRouteName(title.value);
const dependencies = inject(injectedDependenciesKey);
dependencies?.printLog.error("aaaaa");
</script>

<style scoped lang="less">
h2 {
    font-size: 20px;
}
</style>
