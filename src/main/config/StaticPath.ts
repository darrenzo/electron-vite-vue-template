// 这里定义了静态文件路径的位置
import { join as pathJoin } from "path";
import { app } from "electron";
import { URL } from "url";

const isDev = process.env.NODE_ENV === "development";

class StaticPath {
    constructor() {
        const basePath = isDev
            ? pathJoin(__dirname, "..", "..", "..")
            : pathJoin(app.getAppPath(), "..", "..");

        if (isDev) {
            this.__static = pathJoin(basePath, "public");

            this.__lib = pathJoin(
                basePath,
                "rootLib",
                `${process.platform}`,
                `${process.arch}`
            );
            this.__common = pathJoin(basePath, "rootLib", "common");
        } else {
            this.__static = pathJoin(__dirname, "..", "renderer");
            this.__lib = basePath;
            this.__common = basePath;
        }
    }
    /**
     * 静态文件路径 渲染进程目录下
     *
     * @type {string}
     * @memberof StaticPath
     */
    __static: string;

    /**
     * dll文件夹及其他os平台相关的文件路径
     *
     * @type {string}
     * @memberof StaticPath
     */
    __lib: string;

    /**
     * 与os无关的资源
     *
     * @type {string}
     * @memberof StaticPath
     */
    __common: string;
}

const staticPath = new StaticPath();

/**
 * 获取真正的地址
 *
 * @param {string} devPath 开发环境路径
 * @param {string} proPath 生产环境路径
 * @param {string} [hash=''] hash值
 * @param {string} [search=''] search值
 * @return {*}  {string} 地址
 */
function getUrl(
    devPath: string,
    proPath: string,
    hash = "",
    search = ""
): string {
    const url = isDev
        ? new URL(`http://localhost:${process.env.PORT}`)
        : new URL("file://");
    url.pathname = isDev ? devPath : proPath;
    url.hash = hash;
    url.search = search;
    return url.href;
}

export const winURL = getUrl(
    "",
    pathJoin(__dirname, "..", "renderer", "index.html")
);

export const loadingURL = getUrl(
    "/loader.html",
    `${staticPath.__static}/loader.html`
);

export const lib = staticPath.__lib;
export const common = staticPath.__common;
export const staticPaths = getUrl("", staticPath.__static);

// process.env 修改
for (const key in staticPath) {
    process.env[key] = staticPath[key as keyof StaticPath];
}
