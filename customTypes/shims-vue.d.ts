declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent;
    export default component;
}

declare const __CONFIG__: {
    envConfig:
        | {
              NODE_ENV: string;
              MODE: string;
              DEBUG: boolean;
          }
        | undefined;
    clientConfig: {
        appName: string;
        companyName: string;
        copyrightLimit: string;
        appProtocol: string;
        appId: string;
        identityName: string;

        cdn: string;
        remoteBaseConfigUrl: string;
        publishUrl: string;

        sinaUrl: string;
        tencentUrl: string;

        facebookUrl: string;
        twitterUrl: string;
        instagramUrl: string;
        youtubeUrl: string;

        facebookGroupUrl: string;
        forumUrl: string;
        redditUrl: string;

        baseDevApiUrl: string;
        baseProApiUrl: string;

        baseDevApiV2Url: string;
        baseProApiV2Url: string;

        forceLang: string;
        clientId: string;
        needAccount: boolean;
        useBlazUid: boolean;
        limitCountryCode: string;
    };
};
