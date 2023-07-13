import { join } from "path";
import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import { getEnvClientConfig } from "./utils";

function resolve(dir: string) {
    return join(__dirname, "..", dir);
}
const envClientConfig = getEnvClientConfig();

const rendererPath = resolve("src/renderer");

const varPath = resolve("src/renderer/style/variable.less");
const mixinPath = resolve("src/renderer/style/mixin.less");

export default defineConfig({
    mode: process.env.NODE_ENV,
    root: rendererPath,
    define: {
        __CONFIG__: envClientConfig,
    },
    resolve: {
        alias: {
            "@renderer": rendererPath,
            "@assets": resolve("src/assets"),
            "@common": resolve("src/common"),
            "@config": resolve("config"),
        },
    },
    base: "./",
    build: {
        outDir: resolve("dist/electron/renderer"),
        emptyOutDir: true,
        target: "esnext",
        minify: "esbuild",
        cssCodeSplit: false,
    },
    css: {
        preprocessorOptions: {
            less: {
                additionalData: `@import '${varPath}';@import '${mixinPath}';`,
                javascriptEnabled: true,
            },
        },
    },
    plugins: [vuePlugin()],
    server: {},
    optimizeDeps: {},
});
