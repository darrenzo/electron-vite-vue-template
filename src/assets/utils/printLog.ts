import { type IPrintLog } from "@common/remote-config";
import StackTrace from "stacktrace-js";
import { errorManager } from "./errorManager";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ElectronLog = require("electron-log");

class PrintLog implements IPrintLog {
    private isDebug = process.env.DEBUG;

    private handleParams(params: unknown[]) {
        return params.map((item) => {
            return JSON.stringify(item, null, 4);
        });
    }

    public error(...params: unknown[]) {
        const newParams = this.handleParams(params);
        console.error(...newParams);
        ElectronLog.error(...newParams);
    }

    public warn(...params: unknown[]) {
        const newParams = this.handleParams(params);
        console.warn(...newParams);
        ElectronLog.warn(...newParams);
    }

    public info(...params: unknown[]) {
        const newParams = this.handleParams(params);
        console.info(...newParams);
        ElectronLog.info(...newParams);
    }

    public debug(...params: unknown[]) {
        if (!this.isDebug) {
            return;
        }
        const newParams = this.handleParams(params);
        console.debug(...newParams);
        ElectronLog.debug(...newParams);
    }

    public log(...params: unknown[]) {
        const newParams = this.handleParams(params);
        console.log(...newParams);
        ElectronLog.log(...newParams);
    }

    /**
     * @description 打印堆栈跟踪信息,不抛出错误
     * @return {*}  {Promise<string>}
     * @memberof APrintLog
     */
    public async stackTrace(): Promise<string> {
        try {
            const stackFrames = await StackTrace.get();
            const stringifiedStack = stackFrames
                .map((sf) => sf.toString())
                .join("\n");
            console.info(stringifiedStack);
            ElectronLog.info(stringifiedStack);
            return stringifiedStack;
        } catch (error: unknown) {
            const res = "StackTrace.get() failed: " + (error as Error)?.message;
            this.error(res);
            return res;
        }
    }

    /**
     * @description 只在debug环境下打印堆栈跟踪信息，不抛出错误
     * @return {*} {Promise<string> | undefined}
     * @memberof APrintLog
     */
    public stackTraceDebug() {
        if (!this.isDebug) {
            return;
        }
        return this.stackTrace();
    }

    private async stackTraceGet() {
        try {
            const stackFrames = await StackTrace.get();
            return stackFrames.map((sf) => sf.toString());
        } catch (error: unknown) {
            return ["StackTrace.get() failed: " + (error as Error)?.message];
        }
    }

    private async stackTraceFromError(sourceError: Error) {
        try {
            const stackFrames = await StackTrace.fromError(sourceError);
            const stringifiedStack = stackFrames
                .map((sf) => sf.toString())
                .join("\n");
            return stringifiedStack;
        } catch (error) {
            return errorManager.errorToJson(sourceError);
        }
    }

    /**
     * @description 打印error对象的堆栈跟踪信息, 不抛出错误
     * @param {*} error
     * @param {string} [customMsg=''] 第一行自定义的字段，常用来手动补充添加一些错误发生的标记，比如函数调用的路径
     * @memberof APrintLog
     */
    public async stackTraceError(sourceError: Error, customMsg = "") {
        const [stackArr, traceError] = await Promise.all([
            this.stackTraceGet(),
            this.stackTraceFromError(sourceError),
        ]);
        const obj = { traceError: traceError, detailStack: stackArr };
        const errorPool = customMsg ? [customMsg + ": ", obj] : [obj];
        console.error(...errorPool);
        ElectronLog.error(...errorPool);
    }
}

export const printLog = new PrintLog();
