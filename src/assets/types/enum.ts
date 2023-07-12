export enum EColorTheme {
    DARK,
    LIGHT,
}

export enum EUserState {
    none = 0,
    add = 1,
    delete = 2,
    modify = 3,
}

export enum StreamState {
    Closed = 0,
    Opening,
    Loading,
    Playing,
    Failed,
}

export enum EScreenMode {
    None = -1,
    Multi,
    Single,
}

export enum EPlayerMode {
    One = 1,
    TwoHorizontal = 2.1,
    TwoVertical = 2.2,
    Four = 4,
    Six = 6,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Thirteen = 13,
    Fourteen = 14,
    Sixteen = 16,
    TwentyFive = 25,
    ThirtyTwo = 32,
    ThirtySix = 36,
}

export enum EAlarmModeVal {
    NONE,
    MD,
    VL,
    IO,
    BLIND,
    HDEXP,
    HDFULL,
    IPCONFLICT,
    NETCONNECT,
    RF,
    FD,
    VS,
    ID,
    RFLPWR,
    RFTAMPER,
    DONGLELOST,
    PIR,
    TIMING,
    PEOPLE,
    FACE,
    VEHICLE,
    DOG_CAT,
    AI_OTHER,
    VISITOR,
    UNKNOW,
    ALL = 0x7fffffff,
}

export enum EScheduleCate {
    NONE,
    NORMAL,
    MULTI,
}

export enum EPartialExposureCtrl {
    DEFAULT,
    AUTO,
    MANUAL,
}

// 此枚举属性必须要key value 是相同字符串
export enum EAiDetectCate {
    PEOPLE = "PEOPLE",
    VEHICLE = "VEHICLE",
    DOG_CAT = "DOG_CAT",
    FACE = "FACE",
    MD = "MD",
    OTHER = "OTHER",
}

export enum EGuardAction {
    SET,
    SET_TIME,
    SET_IMG,
    GOTO,
}

// 与sdk数据结构的值相同
export enum ESceneMode {
    OUTDOOR,
    INDOOR,
}

export enum ECaptureMode {
    CLEAR,
    BALANCE,
    FLUENT,
    CUSTOM,
}

export enum EAutoDir {
    CLOSE,
    YMD,
    YM,
}

export enum EFtpStreamType {
    MAIN_VIDEO_PIC,
    SUB_VIDEO_PIC,
    EXT_VIDEO_PIC,
    PIC,
    MAIN_VIDEO,
    SUB_VIDEO,
    EXT_VIDEO,
}

export enum EDateForm {
    MDY,
    YMD,
    DMY,
}

export enum ETimeFmt {
    TIME_24,
    TIME_12,
}

export enum ENasStream {
    MAIN_STREAM,
    SUB_STREAM,
    EXTEN_STREAM,
}

export enum ENasBindState {
    NONE,
    BOUND,
}

export enum EAiTrackMode {
    NONE,
    PT_ZOOM,
    DIGITAL_ZOOM,
    DIGITAL_ZOOM_FIRST,
    PT_ZOOM_FIRST,
}

export enum EConstantFrameRate {
    NOT_SUPPORT = -1,
    IMAGE_QUALITY_FIRST,
    VIDEO_FLUENCY_FIRST,
    MULTISTAGE_FRAME_REDUCTION,
}

export enum EHdrMode {
    CLOSE,
    AUTO,
    OPEN,
}

export enum ECoverChannel {
    WIDE,
    TRACK,
}

export enum EEncType {
    VBR,
    CBR,
}

export enum EVideoEncType {
    H264,
    H265,
}

export enum EWiFiFreqPolicy {
    NONE,
    PREFERRED_5G,
    PREFERRED_2_4G,
    ONLY_5G,
    ONLY_2_4G,
}

export enum EWiFiType {
    NONE,
    NOT_SUPPORT_WIFI,
    ONLY_SUPPORT_2_4G,
    SUPPORT_5G,
}

export enum ETwelveHourSign {
    AM,
    PM,
}

export enum EMediaPlayState {
    CLOSED,
    LOADING,
    PLAYING,
    FAILED,
}

export enum EAssemblyMethod {
    POE,
    WIRING,
    POWER,
}

export enum EAiTrackLimitDirection {
    LEFT,
    RIGHT,
}

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
    CLIP,
}

export enum EStreamTypeInEncCfg {
    mainstream = "mainstream",
    substream = "substream",
    extendstream = "extendstream",
}

export enum EStreamSize {
    MAIN,
    EXTERN,
    SUB,
    CLIP,
}

export enum EStreamCate {
    BASE,
    WIDE_ANGLE,
    TELEPHOTO,
    TRACK,
    CLIP,
}

export enum EDirections {
    TOP,
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    LEFT,
    RIGHT,
}

export enum EFishEyeImageType {
    ORIGINAL,
    EXPAND,
}

export enum EFishEyeExpansionModel {
    FISHEYE,
    FOUR_VIEW,
    HEMISPHERIC_VIEW,
    CYLINDRICAL_VIEW,
    DEGREE_180_VIEW,
    DEGREE_360_VIEW,
}

export enum EFishEyeInstallType {
    FLOOR_MOUNTING,
    TOP_MOUNTING,
    WALL_MOUNTING,
}

export enum EVisitorLoudspeakerState {
    OFF,
    ON,
}

export enum EWifiKitAuthMode {
    AUTH_OPEN,
    AUTH_SHARED,
    AUTH_WPAPSK,
    AUTH_WPA2PSK,
    AUTH_DETECT,
    AUTH_WPA2PSK_WPA3SAE_MIXED,
    AUTH_WPA3SAE,
    AUTH_BUTT,
}

export enum EWifiFreqType {
    WIFI_TYPE_UNKNOWN,
    WIFI_TYPE_2_4G,
    WIFI_TYPE_5G,
}

export enum EBinningMode {
    CLOSE,
    AUTO,
}

export enum EInternationalCode {
    // ar = 'ar',
    // cs = 'cs',
    de = "de",
    en = "en",
    el = "el",
    es = "es",
    fi = "fi",
    fr = "fr",
    // he = 'he',
    hk = "hk",
    it = "it",
    ja = "ja",
    ko = "ko",
    nb = "nb",
    // nl = 'nl',
    pl = "pl",
    // pt = 'pt',
    ru = "ru",
    sv = "sv",
    sr = "sr",
    th = "th",
    // tr = 'tr',
    cn = "zh",
}

export enum EOsdPos {
    HIDE = "hide", // default
    TOP_LEFT = "top-left",
    BOTTOM_LEFT = "bottom-left",
    TOP_RIGHT = "top-right",
    BOTTOM_RIGHT = "bottom-right",
    TOP_CENTER = "top-center",
    BOTTOM_CENTER = "bottom-center",
}

export enum EPreviewReplayLimit {
    ON,
    OFF,
}

export enum ENetType {
    WIRE,
    SIM,
    WIFI,
}

export enum EPlayerLayout {
    CLASSIC,
    BASIC,
}

export enum EDingDongNetState {
    INVALID,
    OFFLINE,
    ONLINE,
}
