import { ipcMain, dialog, BrowserWindow, app } from "electron";
import { IsUseSysTitle } from "../config/const";
import { winURL, staticPaths } from "../config/StaticPath";
import { updater } from "./HotUpdater";
import Update from "./checkupdate";
import { otherWindowConfig } from "../config/windowsConfig";

export default {
    Mainfunc() {
        const allUpdater = new Update();
        ipcMain.handle("IsUseSysTitle", async () => {
            return IsUseSysTitle;
        });
        ipcMain.handle("windows-mini", (event) => {
            BrowserWindow.fromWebContents(event.sender)?.minimize();
        });
        ipcMain.handle("window-max", async (event) => {
            if (BrowserWindow.fromWebContents(event.sender)?.isMaximized()) {
                BrowserWindow.fromWebContents(event.sender)?.restore();
                return { status: false };
            } else {
                BrowserWindow.fromWebContents(event.sender)?.maximize();
                return { status: true };
            }
        });
        ipcMain.handle("window-close", (event) => {
            BrowserWindow.fromWebContents(event.sender)?.close();
        });
        ipcMain.handle("check-update", (event) => {
            const win = BrowserWindow.fromWebContents(event.sender);
            if (win) {
                allUpdater.checkUpdate(win);
            }
        });
        ipcMain.handle("confirm-update", () => {
            allUpdater.quitAndInstall();
        });
        ipcMain.handle("app-close", () => {
            app.quit();
        });
        ipcMain.handle("get-static-path", () => {
            return staticPaths;
        });
        ipcMain.handle("open-messagebox", async (event, arg) => {
            const win = BrowserWindow.fromWebContents(event.sender);
            if (!win) {
                return;
            }
            const res = await dialog.showMessageBox(win, {
                type: arg.type || "info",
                title: arg.title || "",
                buttons: arg.buttons || [],
                message: arg.message || "",
                noLink: arg.noLink || true
            });
            return res;
        });
        ipcMain.handle("open-errorbox", (event, arg) => {
            dialog.showErrorBox(arg.title, arg.message);
        });

        ipcMain.handle("hot-update", (event) => {
            updater(BrowserWindow.fromWebContents(event.sender));
        });

        ipcMain.handle("open-win", (event, arg) => {
            const ChildWin = new BrowserWindow({
                titleBarStyle: IsUseSysTitle ? "default" : "hidden",
                ...Object.assign(otherWindowConfig, {})
            });
            // 开发模式下自动开启devtools
            if (process.env.NODE_ENV === "development") {
                ChildWin.webContents.openDevTools({ mode: "undocked", activate: true });
            }
            ChildWin.loadURL(winURL + `#${arg.url}`);
            ChildWin.once("ready-to-show", () => {
                ChildWin.show();
                if (arg.IsPay) {
                    // 检查支付时候自动关闭小窗口
                    const testUrl = setInterval(() => {
                        const Url = ChildWin.webContents.getURL();
                        if (Url.includes(arg.PayUrl)) {
                            ChildWin.close();
                        }
                    }, 1200);
                    ChildWin.on("close", () => {
                        clearInterval(testUrl);
                    });
                }
            });
            // 渲染进程显示时触发
            ChildWin.once("show", () => {
                ChildWin.webContents.send("send-data-test", arg.sendData);
            });
        });
    }
};
