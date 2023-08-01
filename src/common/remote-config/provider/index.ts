import type { InjectionKey } from "vue";
export interface IPrintLog {
    // 不是用在报错提示时尽量不用，因为编译构建正式版时，此log方法不会自动去除，会对实际运行效率造成一定影响
    // 系统崩溃或卡死的回调中不要使用改方法进行日志打印，因为前端代码都无法运行了

    /**
     * Log an error message
     */
    error(...params: unknown[]): void;

    /**
     * Log a warning message
     */
    warn(...params: unknown[]): void;

    /**
     * Log an informational message
     */
    info(...params: unknown[]): void;

    /**
     * Log a debug message
     */
    debug(...params: unknown[]): void;

    /**
     * Shortcut to info
     */
    log(...params: unknown[]): void;

    stackTrace(): Promise<string>;

    stackTraceDebug(): Promise<string> | undefined;

    stackTraceError(sourceError: Error, customMsg?: string): Promise<void>;
}

export interface IDependencies {
    demo: string;
    anyObject: {
        val: number;
    };
    printLog: IPrintLog;
}

// provide inject keys
export const injectedDependenciesKey = Symbol() as InjectionKey<IDependencies>;
