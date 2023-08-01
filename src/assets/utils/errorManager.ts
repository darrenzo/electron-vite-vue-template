// 获取对象任意某个属性的方法，避免出现undefined报错
function lodashGet(
    source: object,
    path: string,
    defaultValue?: undefined
): object | undefined;
function lodashGet<TX>(
    source: object,
    path: string,
    defaultValue?: undefined
): TX | undefined;
function lodashGet<TX>(source: object, path: string, defaultValue: TX): TX;
function lodashGet(source: object, path: string, defaultValue: any) {
    // path字符串写法有   a[3].b -> a.3.b -> [a, 3, b]
    const paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");
    let res = source;
    for (const p of paths) {
        // null 和 undefined 取属性会报错， 所以用 Object 包装一下，Object(null)[0] 返回undefine
        res = Object(res)[p];
        if (res === undefined) {
            return defaultValue;
        }
    }
    return res;
    // console.log(lodashGet({a: null}, 'a.b.c', 3)); // 3
}

// 目前使用在主进程
class ErrorManager {
    // 解析error对象
    public errorToJson(e: any): Record<string, any> {
        const res = {
            code: e.errno || e.code || e.name || -1,
            symbol: e.name || "unknown",
            message: e.message || e.msg || "unknown",
            stack: e.stack || e.trace || "unknown",
        } as Record<string, any>;

        switch (typeof e) {
            case "bigint":
            case "number":
                return {
                    code: e.toString(),
                    symbol: "integer",
                    message: "unknown",
                    stack: "unknown",
                };
            case "boolean":
                return {
                    code: e ? 1 : 0,
                    symbol: "boolean",
                    message: "unknown",
                    stack: "unknown",
                };
            case "string":
                return {
                    code: "unknown",
                    symbol: "string",
                    message: e,
                    stack: "unknown",
                };
            case "symbol":
                return {
                    code: "unknown",
                    symbol: "symbol",
                    message: (e as any).description,
                    stack: "unknown",
                };
            default:
                if (e === null || e === undefined) {
                    e = {};
                }
                if (
                    lodashGet<string>(e, "__proto__.constructor.name", "") ===
                    "QueryFailedError"
                ) {
                    return {
                        symbol: e.code,
                        code: e.errno,
                        message: e.message,
                        query: {
                            sql: e.query,
                            params: e.parameters,
                        },
                        stack: e.stack || e.trace,
                    };
                }
                if (!e) {
                    return {
                        code: -1,
                        symbol: "unknown",
                        message: "unknown",
                        stack: "unknown",
                    };
                }

                for (const item of [
                    "cmd",
                    "handle",
                    "channel",
                    "session",
                    "data",
                ]) {
                    if (e[item]) {
                        res[item] = e[item];
                    }
                }

                return res;
        }
    }
}

export const errorManager = new ErrorManager();
