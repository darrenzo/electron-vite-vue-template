import { BCSDK_RECORD_STATE_E } from "@reolink/cli.bcsdk/bc-sdk/types";
import { deviceManager } from "../_sdk/deviceManager";
import { playerManager } from "../_sdk/playerManager";
import { record } from "@reolink/cli.bcsdk";
import { errorManager } from "@/renderer/assets/ts/errorManager";
import { electronStorage } from "./electronStorage";
import { printLog } from "@/../injection/printLog";
import { app } from "electron";

class QuitManager {
    private async closeLocalRecordSchedule(): Promise<void> {
        try {
            // 关闭软件时，需要停止本地录像并且生成录像文件，否则录像文件不会生成
            // windows在触发关机事件中没有可以延缓关机的api，所以本地录像计划无法保存住录像
            await record.closeLocalRecordSchedule();
            printLog.debug(
                "------------------ closeLocalRecordSchedule ---------------------------"
            );
        } catch (error) {
            printLog.error(
                "closeLocalRecordSchedule failed: ",
                errorManager.errorToJson(error)
            );
        }
    }

    private stopAllLiveRecord() {
        return Promise.allSettled(
            playerManager.playersInfo.map((info) => {
                const device = deviceManager.getDeviceWithHandle(
                    info.deviceHandle
                );
                if (!device) {
                    return;
                }

                const channel = device.getChannelAtChannelIndex(
                    info.channelIndex
                );
                if (!channel) {
                    return;
                }

                if (
                    channel.live.recordState ===
                    BCSDK_RECORD_STATE_E.BCSDK_RECORD_STATE_CLOSED
                ) {
                    return;
                }

                return record.stopLiveRecord(channel.handle, channel.index);
            })
        );
    }

    private saveElectronStorage() {
        try {
            electronStorage.saveStore();
        } catch (error) {
            printLog.error(
                "electronStorage saveStore failed: ",
                errorManager.errorToJson(error)
            );
        }
    }

    public async handlerBeforeQuit() {
        this.saveElectronStorage();

        await Promise.allSettled([
            this.closeLocalRecordSchedule(),
            this.stopAllLiveRecord()
        ]);
    }

    private handlerBeforeQuitAlready = false;

    public async handlerAtQuit() {
        if (this.handlerBeforeQuitAlready) {
            return;
        }
        this.handlerBeforeQuitAlready = true;

        await this.handlerBeforeQuit();
        // closeLocalRecordSchedule 接口返回成功时，录像不一定生成，需要添加延时执行quit
        setTimeout(() => {
            printLog.debug("----------handlerAtQuit > quit-------------");
            app.quit();
        }, 2000);
    }
}

export const quitManager = new QuitManager();
