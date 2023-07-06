const ReoApiBaseUrl = process.env.VUE_APP_API_BASE_URL;

// TODO 没做完
const ReoApiV2BaseUrl = process.env.VUE_APP_API_V2_BASE_URL;

const copyrightYear = Math.max(2023, new Date().getFullYear());

export default {
    dev: {
        removeElectronJunk: true,
        port: 9080
    },
    DllFolder: "",
    copyrightYear
};
