export type IWindowName =
    | ""
    | "about"
    | "accountLogin"
    | "bellAssemblyInstructions"
    | "changePassword"
    | "deviceAdd"
    | "remoteConfig"
    | "deviceInfo"
    | "deviceLogin"
    | "dialog"
    | "playbackDownload"
    | "playbackCalendar"
    | "liveAudio"
    | "liveCrop"
    | "livePTZ"
    | "liveQuickReply"
    | "liveRing"
    | "liveTimelapse"
    | "fisheyeExpand"
    | "localSettings"
    | "main"
    | "serviceTerms"
    | "updater"
    | "wifiSettings"
    | "renaming"
    | "trackRangeLimit"
    | "unavailable";

export type TDownloadTask = "timelapse" | "common" | "all";

export enum EStreamType {
    MAIN,
    SUB,
    EXTERN,
    WIDE_ANGLE_MAIN,
    WIDE_ANGLE_SUB,
    TELEPHOTO_MAIN,
    TELEPHOTO_SUB,
    TRACK_MAIN,
    TRACK_SUB,
    CLIP
}

export interface IShearInfo {
    handle: number;
    channelIndex: number;
    channelUid: string;
    startTimestamp: number;
    endTimestamp: number;
    streamType: EStreamType;
    fileName: string;
    shearFolderName: string;
}
