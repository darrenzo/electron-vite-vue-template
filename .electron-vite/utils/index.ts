export * as chalkLog from "./chalkLog";

import { type IEnvClientConfig, china, factory, ludafarm, reolink, russia, uniden } from "../client";
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

export const getEnvClientConfig: () => IEnvClientConfig = () => {
    const clientConfig = clientConfigManager.getConfig();
    const envConfig = envManager.getEnvConfig();

    return {
        envConfig,
        clientConfig
    };
};
