process.env.NODE_ENV = "development";

import electron from "electron";
import chalk from "chalk";
import { join } from "path";
import { watch } from "rollup";
import Portfinder from "portfinder";
import config from "../config";
import { say } from "cfonts";
import { spawn } from "child_process";
import type { ChildProcess } from "child_process";
import { createServer } from "vite";
import rollupOptions from "./rollup.config";

const mainOpt = rollupOptions(process.env.NODE_ENV);

let electronProcess: ChildProcess | null = null;
let manualRestart = false;

function logStats(proc: string, data: any) {
    let log = "";

    log += chalk.yellow.bold(
        `┏ ${proc} 编译过程 ${new Array(19 - proc.length + 1).join("-")}`
    );

    log += "\n\n";

    if (typeof data === "object") {
        data.toString({
            colors: true,
            chunks: false
        })
            .split(/\r?\n/)
            .forEach((line: string) => {
                log += "  " + line + "\n";
            });
    } else {
        log += `  ${data}\n`;
    }

    log += "\n" + chalk.yellow.bold(`┗ ${new Array(28 + 1).join("-")}`) + "\n";
    console.log(log);
}

function removeJunk(chunk: string) {
    if (config.dev.removeElectronJunk) {
        // Example: 2018-08-10 22:48:42.866 Electron[90311:4883863] *** WARNING: Textured window <AtomNSWindow: 0x7fb75f68a770>
        if (
            /\d+-\d+-\d+ \d+:\d+:\d+\.\d+ Electron(?: Helper)?\[\d+:\d+] /.test(
                chunk
            )
        ) {
            return false;
        }

        // Example: [90789:0810/225804.894349:ERROR:CONSOLE(105)] 'Uncaught (in promise) Error: Could not instantiate: ProductRegistryImpl.Registry', source: chrome-devtools://devtools/bundled/inspector.js (105)
        if (/\[\d+:\d+\/|\d+\.\d+:ERROR:CONSOLE\(\d+\)\]/.test(chunk)) {
            return false;
        }

        // Example: ALSA lib confmisc.c:767:(parse_card) cannot find card '0'
        if (/ALSA lib [a-z]+\.c:\d+:\([a-z_]+\)/.test(chunk)) {
            return false;
        }
    }

    return chunk;
}

function mainProcessLog(data: any, color: "blue" | "red") {
    if (data) {
        let log = "";
        data = data.toString().split(/\r?\n/);
        data.forEach((line: string) => {
            log += `  ${line}\n`;
        });
        console.log(
            chalk[color].bold("┏ 主程序日志 -------------------") +
                "\n\n" +
                log +
                chalk[color].bold("┗ ----------------------------") +
                "\n"
        );
    }
}

function startRendererServer(): Promise<void> {
    return new Promise((resolve, reject) => {
        Portfinder.basePort = config.dev.port || 9080;
        Portfinder.getPort(async (err, port) => {
            if (err) {
                return reject("PortError:" + err);
            }
            const server = await createServer({
                configFile: join(__dirname, "vite.config.ts")
            });
            process.env.PORT = `${port}`;
            await server.listen(port);
            console.log(
                "\n\n" + chalk.blue("  正在准备主进程，请等待...") + "\n\n"
            );
            resolve();
        });
    });
}

function startMainWatcher(): Promise<void> {
    return new Promise((resolve, reject) => {
        const MainWatcher = watch(mainOpt);

        MainWatcher.on("change", (filename) => {
            // 主进程日志部分
            logStats("主进程文件变更", filename);
        });

        MainWatcher.on("event", (event) => {
            if (event.code === "END") {
                if (electronProcess) {
                    manualRestart = true;
                    if (electronProcess.pid) {
                        process.kill(electronProcess.pid);
                    }
                    electronProcess = null;
                    startElectroProcess();

                    setTimeout(() => {
                        manualRestart = false;
                    }, 5000);
                }

                return resolve();
            } else if (event.code === "ERROR") {
                return reject(event.error);
            }
        });
    });
}

function startElectroProcess() {
    let args = [
        "--inspect=5858",
        join(__dirname, "../dist/electron/main/main.js")
    ];

    // detect yarn or npm and process command line args accordingly

    if (process.env.npm_execpath?.endsWith("yarn.js")) {
        args = args.concat(process.argv.slice(3));
    } else if (process.env.npm_execpath?.endsWith("npm-cli.js")) {
        args = args.concat(process.argv.slice(2));
    }

    electronProcess = spawn(electron as any, args);

    electronProcess?.stdout?.on("data", (data: string) => {
        mainProcessLog(removeJunk(data), "blue");
    });
    electronProcess?.stderr?.on("data", (data: string) => {
        mainProcessLog(removeJunk(data), "red");
    });

    electronProcess.on("close", () => {
        if (!manualRestart) process.exit();
    });
}

function greeting() {
    const cols = process.stdout.columns;
    let text = "";

    // TODO
    if (cols > 104) {
        text = "electron-vite";
    } else if (cols > 76) {
        text = "electron-|vite";
    }

    if (text) {
        say(text, {
            colors: ["yellow"],
            font: "simple3d",
            space: false
        });
    } else {
        console.log(chalk.yellow.bold("\n  electron-vite"));
    }

    console.log(chalk.blue("  准备启动...") + "\n");
}

async function init() {
    greeting();

    try {
        await startRendererServer();

        await startMainWatcher();

        startElectroProcess();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

init();
