export * as chalkLog from "./chalkLog";

import { DotenvParseOutput } from "dotenv";
import { type IClientConfig, china, factory, ludafarm, reolink, russia, uniden } from "../client";
import { clientConfigManager } from "./clientConfigManager";
import { envManager } from "./envManager";

const clientConfigs = {
    china,
    factory,
    ludafarm,
    reolink,
    russia,
    uniden
};

clientConfigManager.init(clientConfigs);

export interface IEnvClientConfig {
    envConfig: DotenvParseOutput | undefined;
    clientConfig: Omit<IClientConfig, "baseDevApiUrl" | "baseProApiUrl" | "baseDevApiV2Url" | "baseProApiV2Url"> & { baseApiUrl: string; baseApiV2Url: string };
}

export const getEnvClientConfig: () => IEnvClientConfig = () => {
    const clientConfig = clientConfigManager.getConfig();
    const envConfig = envManager.getEnvConfig();

    let baseApiUrl = clientConfig.baseProApiUrl;
    let baseApiV2Url = clientConfig.baseProApiV2Url;

    if (envConfig && envConfig.MODE !== "production") {
        baseApiUrl = clientConfig.baseDevApiUrl;
        baseApiV2Url = clientConfig.baseDevApiV2Url;
    }

    Reflect.deleteProperty(clientConfig, "baseDevApiUrl");
    Reflect.deleteProperty(clientConfig, "baseProApiUrl");
    Reflect.deleteProperty(clientConfig, "baseDevApiV2Url");
    Reflect.deleteProperty(clientConfig, "baseProApiV2Url");

    return {
        envConfig,
        clientConfig: {
            ...clientConfig,
            baseApiUrl,
            baseApiV2Url
        }
    };
};
