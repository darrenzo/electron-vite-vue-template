import { config } from "dotenv";
import { join as pathJoin } from "path";
import minimist from "minimist";

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
}

export const envManager = new EnvManager();
