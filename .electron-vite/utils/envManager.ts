import { config } from "dotenv";
import { join as pathJoin } from "path";
import minimist from "minimist";
import { doneLog } from "./chalkLog";

class EnvManager {
    private envPath: string;
    constructor() {
        const argv = minimist(process.argv.slice(2));

        let env = argv["mode"];
        if (!env) {
            env = "development";
        }
        this.envPath = pathJoin(__dirname, "..", "..", `env/${env}.env`);
    }

    public getEnvConfig() {
        return config({ path: this.envPath }).parsed;
    }

    /**
     * @description 注入环境变量 NODE_ENV，MODE，DEBUG
     * @memberof EnvManager
     */
    public injectEnvConfig() {
        const EnvConfig = this.getEnvConfig();
        if (EnvConfig) {
            if (EnvConfig.NODE_ENV) {
                process.env.NODE_ENV = EnvConfig.NODE_ENV;
            }

            if (EnvConfig.development) {
                process.env.MODE = EnvConfig.development;
            }

            if (EnvConfig.DEBUG) {
                process.env.DEBUG = EnvConfig.DEBUG;
            }

            console.log(`${doneLog}已注入以下环境变量：
                process.env.NODE_ENV: ${process.env.NODE_ENV},
                process.env.MODE: ${process.env.MODE},
                process.env.DEBUG: ${process.env.DEBUG},
            `);
        }
    }
}

export const envManager = new EnvManager();
