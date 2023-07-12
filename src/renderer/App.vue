<template>
    <div>store: {{ title }} --- {{ t("common_ipc") }}</div>
    <div class="router-box">
        <router-link
            v-slot="{ navigate }"
            to="/land-page"
            custom
        >
            <span
                class="icon-toolbar_low"
                @click="navigate"
            > land-page </span>
        </router-link>
        <router-link to="/other-page">
            other-page
        </router-link>
    </div>
    <router-view />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTemplateStore } from "./store";
import { useI18n } from "vue-i18n";
const templateStore = useTemplateStore();
const title = computed(() => templateStore.crrRouteName);
const { t } = useI18n();
</script>

<style lang="less" scoped>
.router-box {
    .flex();

    .icon-toolbar_low {
        color: @color_warn_active;
    }

    a {
        margin-left: 10px;
        color: @color_warn;
    }
}
</style>
