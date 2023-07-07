import { autoUpdater, type ProgressInfo } from "electron-updater";
import { BrowserWindow } from "electron";
import buildConfig from "@main/../../build.json";

/**
 * -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载完成
 *
 * @class Update
 */
class Update {
    public mainWindow: BrowserWindow | null = null;
    constructor() {
        // 设置url
        autoUpdater.setFeedURL(buildConfig.publish[0].url);

        // 当更新发生错误的时候触发。
        autoUpdater.on("error", (err) => {
            console.log("更新出现错误", err.message);
            if (!this.mainWindow) {
                return;
            }
            // TODO 错误处理需要修改
            if (err.message.includes("sha512 checksum mismatch")) {
                this.Message(this.mainWindow, -1, "sha512校验失败");
            } else {
                this.Message(this.mainWindow, -1, "错误信息请看主进程控制台");
            }
        });

        // 当开始检查更新的时候触发
        autoUpdater.on("checking-for-update", () => {
            console.log("开始检查更新");
            if (!this.mainWindow) {
                return;
            }
            this.Message(this.mainWindow, 0);
        });

        // 发现可更新数据时
        autoUpdater.on("update-available", () => {
            console.log("有更新");
            if (!this.mainWindow) {
                return;
            }
            this.Message(this.mainWindow, 1);
        });

        // 没有可更新数据时
        autoUpdater.on("update-not-available", () => {
            console.log("没有更新");
            if (!this.mainWindow) {
                return;
            }
            this.Message(this.mainWindow, 2);
        });

        // 下载监听
        autoUpdater.on("download-progress", (progressObj: ProgressInfo) => {
            if (!this.mainWindow) {
                return;
            }
            this.Message(this.mainWindow, 3, progressObj);
        });

        // 下载完成
        autoUpdater.on("update-downloaded", () => {
            console.log("下载完成");
            if (!this.mainWindow) {
                return;
            }
            this.Message(this.mainWindow, 4);
        });
    }

    // 负责向渲染进程发送信息
    Message(
        mainWindow: BrowserWindow,
        type: number,
        data?: string | ProgressInfo
    ) {
        const sendData = {
            state: type,
            msg: data || ""
        };
        mainWindow.webContents.send("UpdateMsg", sendData);
    }

    // 执行自动更新检查
    async checkUpdate(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow;
        try {
            await autoUpdater.checkForUpdates();
        } catch (error) {
            console.log("网络连接问题", error);
        }
    }

    // 退出并安装
    quitAndInstall() {
        autoUpdater.quitAndInstall();
    }
}

export default Update;
