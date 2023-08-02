interface memoryInfo {
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
}

interface Window {
    performance: {
        memory: memoryInfo;
    };
    __lib: string;
    __static: string;
}

declare const __MAIN_CONFIG__: {
    envConfig:
        | {
              NODE_ENV: string;
              MODE: string;
              DEBUG: "true" | "false";
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

declare const __CONFIG__: {
    envConfig:
        | {
              NODE_ENV: string;
              MODE: string;
              DEBUG: "true" | "false";
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
