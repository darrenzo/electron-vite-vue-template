declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent;
    export default component;
}

declare const __CONFIG__: {
    envConfig:
        | {
              [key: string]: string;
          }
        | undefined;
    clientConfig: {
        [key: string]: string;
    };
};
