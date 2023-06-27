import { config } from "dotenv";
import { join as pathJoin } from "path";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const rootResolve = (...pathSegments: string[]) => pathJoin(__dirname, "..", ...pathSegments);

export const getEnv = () => argv["m"];

const getEnvPath = () => {
    if (String(typeof getEnv()) === "boolean" || String(typeof getEnv()) === "undefined") {
        return rootResolve("env/.env");
    }
    return rootResolve(`env/${getEnv()}.env`);
};

export const getEnvConfig = () => config({ path: getEnvPath() }).parsed;
