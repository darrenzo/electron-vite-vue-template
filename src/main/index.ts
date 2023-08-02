"use strict";

import {
    app,
    crashReporter,
    powerMonitor,
    session,
    type WebContents,
    type Certificate,
    type RenderProcessGoneDetails,
    type Details,
} from "electron";
import electronDl from "electron-dl";
// import { quitManager } from "./services/quitManager";
import InitWindow from "./services/windowManager";
import { printLog } from "@assets/utils";

crashReporter.start({
    productName: "reolink",
    submitURL: "",
    uploadToServer: false,
});

if (!app.requestSingleInstanceLock()) {
    printLog.info(
        "------------------ app requestSingleInstanceLock exit ---------------------------"
    );
    app.exit();
}

electronDl();

// windows notification
if (process.env.NODE_ENV === "development") {
    app.setAppUserModelId(process.execPath);
} else {
    app.setAppUserModelId(__MAIN_CONFIG__.clientConfig.appId);
}

if (app.isPackaged) {
    app.setAsDefaultProtocolClient("reolink");
} else {
    app.removeAsDefaultProtocolClient("reolink");
    console.log("由于框架特殊性开发环境下无法使用");
}

// 由于9.x版本问题，需要加入该配置关闭跨域问题
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

addAppEventListeners();

function onAppReady() {
    if (process.env.NODE_ENV === "development") {
        const { VUEJS3_DEVTOOLS } = require("electron-devtools-vendor");
        session.defaultSession.loadExtension(VUEJS3_DEVTOOLS, {
            allowFileAccess: true,
        });
        console.log("已安装: vue-devtools");
    }
    new InitWindow().createMainWindow();
}

app.whenReady().then(onAppReady);

function addAppEventListeners() {
    app.on(
        "certificate-error",
        (
            event: Event,
            webContents: WebContents,
            url: string,
            /**
             * The error code
             */
            error: string,
            certificate: Certificate
        ) => {
            printLog.error(
                `------------------- app certificate-error url: ${JSON.stringify(
                    {
                        url: url,
                        error: error,
                        certificate: certificate,
                    }
                )} --------------------`
            );
        }
    );

    app.on(
        "continue-activity-error",
        (
            event: Event,
            /**
             * A string identifying the activity. Maps to .
             */
            type: string,
            /**
             * A string with the error's localized description.
             */
            error: string
        ) => {
            printLog.error(
                `------------------ app continue-activity-error: ${JSON.stringify(
                    {
                        type: type,
                        error: error,
                    }
                )}---------------------------`
            );
        }
    );

    app.on("child-process-gone", (event: Event, details: Details) => {
        printLog.error(
            `------------------ app child-process-gone, details: ${JSON.stringify(
                details
            )}---------------------------`
        );
    });

    app.on(
        "render-process-gone",
        (
            event: Event,
            webContents: WebContents,
            details: RenderProcessGoneDetails
        ) => {
            printLog.error(
                `------------------ app render-process-gone, details: ${JSON.stringify(
                    details
                )}---------------------------`
            );
        }
    );

    // 如果用户按下了 Cmd + Q，或者开发者调用了 app.quit()，Electron 会首先关闭所有的窗口然后触发 will-quit 事件，在这种情况下 window-all-closed 事件不会被触发
    app.on("window-all-closed", async () => {
        printLog.info(
            "------------------ window-all-closed ---------------------------"
        );
        // quitManager.handlerAtQuit();
    });

    // 如果由 autoUpdater.quitAndInstal() 退出应用程序 ，那么在所有窗口触发 close 之后 才会触发 before-quit 并关闭所有窗口
    // 在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发
    app.on("before-quit", () => {
        printLog.info(
            "------------------ app before-quit ---------------------------"
        );
        // quitManager.handlerAtQuit();
    });

    // 在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发
    app.on("will-quit", () => {
        printLog.info(
            "------------------ app will-quit ---------------------------"
        );
        // quitManager.handlerAtQuit();
    });

    // 在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发
    app.on("quit", () => {
        printLog.info(
            "------------------ app quit ---------------------------"
        );
        // quitManager.handlerAtQuit();
    });

    // 系统即将重启或关机时触发 Linux macOS
    // windows的关机事件在主窗口的session-end事件回调中处理
    powerMonitor.on("shutdown", (e: Event) => {
        printLog.info(
            "------------------ shutdown ---------------------------"
        );
        e.preventDefault(); // 延缓关机行为
        // quitManager.handlerAtQuit();
    });
}
