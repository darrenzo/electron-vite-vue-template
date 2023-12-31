import { join as pathJoin } from "path";
import { builtinModules } from "module";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";
import esbuild from "rollup-plugin-esbuild";
import obfuscator from "rollup-plugin-obfuscator";
import { defineConfig } from "rollup";
import { dependencies } from "../package.json";
import { getEnvClientConfig } from "./utils";

const envClientConfig = getEnvClientConfig();

const rootResolve = (...pathSegments: string[]) =>
    pathJoin(__dirname, "..", ...pathSegments);

// 在此处获取process.env.NODE_ENV恒为undefined
export default (env = "production") => {
    return defineConfig({
        input: rootResolve("src/main/index.ts"),
        output: {
            file: rootResolve("dist/electron/main/main.js"),
            format: "cjs",
            name: "MainProcess",
            sourcemap: false,
        },
        plugins: [
            replace({
                // 不对赋值操作进行替换
                preventAssignment: true,
                values: {
                    // 业务中使用时 __MAIN_CONFIG__ 会自动替换成 envClientConfig 对象 而不是字符串
                    __MAIN_CONFIG__: JSON.stringify(envClientConfig),
                },
            }),
            // 提供路径和读取别名
            nodeResolve({
                preferBuiltins: true,
                browser: false,
                extensions: [".mjs", ".ts", ".js", ".json", ".node"],
            }),
            commonjs({
                sourceMap: false,
            }),
            json(),
            esbuild({
                // All options are optional
                include: /\.[jt]s?$/, // default, inferred from `loaders` option
                exclude: /node_modules/, // default
                // watch: process.argv.includes('--watch'), // rollup 中有配置
                sourceMap: env !== "production", // default
                minify: env === "production",
                target: "es2017", // default, or 'es20XX', 'esnext'
                // Like @rollup/plugin-replace
                define: {
                    __VERSION__: "'x.y.z'",
                },
                // Add extra loaders
                loaders: {
                    // Add .json files support
                    // require @rollup/plugin-commonjs
                    ".json": "json",
                    // Enable JSX in .js files too
                    ".js": "jsx",
                },
            }),
            alias({
                entries: [
                    { find: "@assets", replacement: rootResolve("src/assets") },
                    { find: "@common", replacement: rootResolve("src/common") },
                    { find: "@main", replacement: rootResolve("src/main") },
                    { find: "@config", replacement: rootResolve("config") },
                ],
            }),
            process.env.NODE_ENV === "production"
                ? obfuscator({ global: true })
                : null,
        ],
        external: [...builtinModules, ...Object.keys(dependencies), "electron"],
    });
};
