/**
 * power by biuuu
 */

import { emptyDir, createWriteStream, readFile, copy, remove } from "fs-extra";
import { join, resolve } from "path";
import { promisify } from "util";
import { pipeline } from "stream";
import { app, BrowserWindow } from "electron";
import { gt } from "semver";
import { createHmac, type BinaryLike } from "crypto";
import extract from "extract-zip";
import { version } from "../../../package.json";
import { hotPublishConfig } from "../config/hotPublish";
import axios from "axios";

const streamPipeline = promisify(pipeline);
// \build\win-unpacked\resources\app
const appPath = app.getAppPath();
// \build\win-unpacked\update
const updatePath = resolve(appPath, "..", "..", "update");
const request = axios.create();
/**
 * @param data 文件流
 * @param type 类型，默认sha256
 * @param key 密钥，用于匹配计算结果
 * @returns {string} 计算结果
 * @author umbrella22
 * @date 2021-03-05
 */
function hash(data: BinaryLike, type = "sha256", key = "Sky") {
    const hmac = createHmac(type, key);
    hmac.update(data);
    return hmac.digest("hex");
}

/**
 * @param url 下载地址
 * @param filePath 文件存放地址
 * @returns {void}
 * @author umbrella22
 * @date 2021-03-05
 */
async function download(url: string, filePath: string) {
    const res = await request({ url, responseType: "stream" });
    await streamPipeline(res.data, createWriteStream(filePath));
}

const updateInfo = {
    status: "init",
    message: ""
};

/**
 * @param windows 指主窗口
 * @returns {void}
 * @author umbrella22
 * @date 2021-03-05
 */
export const updater = async (windows: BrowserWindow | null) => {
    try {
        // 判断是否有版本更新
        const res = await request({ url: `${hotPublishConfig.url}/${hotPublishConfig.configName}.json?time=${new Date().getTime()}` });
        if (!gt(res.data.version, version)) return;

        // 开始下载资源压缩包
        await emptyDir(updatePath);
        const filePath = join(updatePath, res.data.name);
        updateInfo.status = "downloading";
        if (windows) windows.webContents.send("hot-update-status", updateInfo);
        await download(`${hotPublishConfig.url}/${res.data.name}`, filePath);

        // 完整性校验
        const buffer = await readFile(filePath);
        const sha256 = hash(buffer);
        if (sha256 !== res.data.hash) throw new Error("sha256 error");

        // 解压文件到指定临时文件夹
        const appPathTemp = join(updatePath, "temp");
        await extract(filePath, { dir: appPathTemp });
        updateInfo.status = "moving";
        if (windows) windows.webContents.send("hot-update-status", updateInfo);

        // 删除旧文件
        await remove(join(`${appPath}`, "dist"));
        await remove(join(`${appPath}`, "package.json"));

        // 从临时文件夹拷贝到appPath
        await copy(appPathTemp, appPath);
        updateInfo.status = "finished";
        if (windows) windows.webContents.send("hot-update-status", updateInfo);
        resolve("success");
    } catch (error) {
        updateInfo.status = "failed";
        updateInfo.message = error as string;
        if (windows) windows.webContents.send("hot-update-status", updateInfo);
    }
};

export const getUpdateInfo = () => updateInfo;
