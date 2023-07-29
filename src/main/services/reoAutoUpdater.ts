import {
    autoUpdater,
    CancellationToken,
    type AppUpdater,
    type UpdateCheckResult,
} from "electron-updater";
import type { AppUpdaterEvents } from "electron-updater/out/AppUpdater";
import log from "electron-log";

class AutoUpdaterManager {
    private _reoAutoUpdater: AppUpdater = autoUpdater;
    private _publishFolder: string = this.completeSuffix(
        process.env.VUE_APP_PUBLISH_URL
    );
    private _version = "";

    constructor() {
        this._reoAutoUpdater.autoDownload = false;
        this._reoAutoUpdater.logger = log;
        // FIX: 修复查询yml文件的url会默认带上 ?noCache=${hash:5} 的问题
        this._reoAutoUpdater.requestHeaders = { authorization: "" };
        this.setReoFeedURL(this._publishFolder);
    }

    get publishFolder(): string {
        return this._publishFolder;
    }

    set publishFolder(value: string) {
        this._publishFolder = this.completeSuffix(value);
    }

    private completeSuffix(url: string | undefined): string {
        if (!url) {
            return "";
        }
        return /.+\/$/.test(url) ? url : url + "/";
    }

    private setReoFeedURL(url: string) {
        this._reoAutoUpdater.setFeedURL({
            provider: "generic",
            url: url,
            updaterCacheDirName: `${process.env.VUE_APP_APP_NAME}-updater`,
        });
    }

    public setVersionOfUpdate(version: string): void {
        if (!version) {
            return;
        }
        this._version = this.completeSuffix(version);
        const url = `${this._publishFolder}${this._version}`;
        log.log(`reoAutoUpdater > setVersionOfUpdate ${version} url: `, url);
        this.setReoFeedURL(url);
    }

    public setPublishFolder(publishFolder: string): void {
        if (!publishFolder) {
            return;
        }
        this._publishFolder = this.completeSuffix(publishFolder);
        const url = `${this._publishFolder}${this._version}`;
        log.log(
            `reoAutoUpdater > setPublishFolder publishFolder ${publishFolder} url: `,
            url
        );
        this.setReoFeedURL(url);
    }

    public on<E extends keyof AppUpdaterEvents>(
        event: E,
        listener: AppUpdaterEvents[E]
    ): void {
        this._reoAutoUpdater.on(event, listener);
    }

    public checkForUpdates(): Promise<UpdateCheckResult | null> {
        return this._reoAutoUpdater.checkForUpdates();
    }

    public downloadUpdate(cancellationToken: CancellationToken | undefined) {
        return this._reoAutoUpdater.downloadUpdate(cancellationToken);
    }
}

const autoUpdaterManager = new AutoUpdaterManager();

export { CancellationToken, autoUpdaterManager, type UpdateCheckResult };
