export { factory } from "./factory";
export { china } from "./china";
export { reolink } from "./reolink";
export { ludafarm } from "./ludafarm";
export { russia } from "./russia";
export { uniden } from "./uniden";

export type TConfigClient =
    | "factory"
    | "china"
    | "reolink"
    | "ludafarm"
    | "russia"
    | "uniden";

export interface IClientConfig {
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
}
