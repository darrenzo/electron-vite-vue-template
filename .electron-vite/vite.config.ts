import { join } from "path";
import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import { getEnvConfig } from "./utils/envManager";

function resolve(dir: string) {
    return join(__dirname, "..", dir);
}
const envConfig = getEnvConfig();

const rendererPath = resolve("src/renderer");

export default defineConfig({
    mode: process.env.NODE_ENV,
    root: rendererPath,
    define: {
        __CONFIG__: envConfig
    },
    resolve: {
        alias: {
            "@renderer": rendererPath
        }
    },
    base: "./",
    build: {
        outDir: resolve("dist/electron/renderer"),
        emptyOutDir: true,
        target: "esnext",
        minify: "esbuild",
        cssCodeSplit: false
    },
    plugins: [vuePlugin()],
    server: {},
    optimizeDeps: {}
});
