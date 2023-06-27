declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent;
    export default component;
}

declare const __CONFIG__: {
    [key: string]: string;
};
