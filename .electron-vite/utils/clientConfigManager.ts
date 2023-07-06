import minimist from "minimist";
import type { TConfigClient, IClientConfig } from "../client/index";

type TConfigStore = Record<TConfigClient, IClientConfig>;

class ClientConfigManager {
    private store: TConfigStore | null = null;

    private buildTarget: TConfigClient;

    constructor() {
        this.buildTarget = this.getBuildTarget();
    }

    private getBuildTarget() {
        const argv = minimist(process.argv.slice(2));
        const buildTarget = argv["target"];
        if (!buildTarget) {
            throw new Error("未指定编译目标，比如：yarn dev reolink");
        }

        return buildTarget as TConfigClient;
    }

    public init(configs: TConfigStore) {
        if (this.store) {
            throw new Error("clientConfigManager init > 请勿重复执行初始化");
        }
        this.store = {
            ...configs
        };
    }

    public getConfig(): IClientConfig {
        if (!this.store) {
            throw new Error("clientConfigManager 未初始化");
        }
        const config = this.store[this.buildTarget];
        if (!config) {
            throw new Error(`${this.buildTarget} 的配置不存在`);
        }
        return config;
    }
}

export const clientConfigManager = new ClientConfigManager();
