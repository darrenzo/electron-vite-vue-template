import { defineStore } from "pinia";
import { ref } from "vue";

export const useTemplateStore = defineStore("template", () => {
    const crrRouteName = ref("");
    function setCrrRouteName(name: string) {
        crrRouteName.value = name;
    }
    return { crrRouteName, setCrrRouteName };
});
