import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { i18nCreator } from "@assets/i18n";
import {
    injectedDependenciesKey,
    type IDependencies,
    type IPrintLog,
} from "./provider";

const i18n = await i18nCreator();

const app = createApp(App);
const store = createPinia();
app.use(router);
app.use(store);
app.use(i18n);

export type { IDependencies, IPrintLog };

export const injectDependencies = (dependencies: IDependencies) => {
    app.provide(injectedDependenciesKey, dependencies);
    app.mount("#remoteConfig");
};
