import { join } from "path";
import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import { getEnvClientConfig } from "./utils";

function resolve(dir: string) {
    return join(__dirname, "..", dir);
}
const envClientConfig = getEnvClientConfig();

const rendererPath = resolve("src/renderer");

console.log("vite process.env.NODE_ENV", process.env.NODE_ENV);

export default defineConfig({
    mode: process.env.NODE_ENV,
    root: rendererPath,
    define: {
        __CONFIG__: envClientConfig
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
