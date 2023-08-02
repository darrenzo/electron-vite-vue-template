import CryptoJS from "crypto-js";
import { printLog } from "@assets/utils";

type WordArray = CryptoJS.lib.WordArray;
type CipherParams = CryptoJS.lib.CipherParams;

interface Format {
    /**
     * Converts a cipher params object to an OpenSSL-compatible string.
     *
     * @param cipherParams The cipher params object.
     *
     * @return The OpenSSL-compatible string.
     *
     * @example
     *
     *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
     */
    stringify(cipherParams: CipherParams): string;

    /**
     * Converts an OpenSSL-compatible string to a cipher params object.
     *
     * @param openSSLStr The OpenSSL-compatible string.
     *
     * @return The cipher params object.
     *
     * @example
     *
     *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
     */
    parse(str: string): CipherParams;
}

interface CipherOption {
    /**
     * The IV to use for this operation.
     */
    iv?: WordArray;
    format?: Format;
    [key: string]: any;
}

export class ReoCrypto {
    private aesKey: WordArray;

    constructor(flag: string) {
        const key = this.MD5(flag).toUpperCase();
        this.aesKey = CryptoJS.enc.Utf8.parse(key);
    }

    private cryptoCfg: CipherOption = {
        iv: CryptoJS.enc.Utf8.parse("bcswebapp1234567"),
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.ZeroPadding,
    };

    public MD5(message: WordArray | string): string {
        return CryptoJS.MD5(message).toString();
    }

    public encrypt(message: string): string {
        const srcs = CryptoJS.enc.Utf8.parse(message);
        const encrypted = CryptoJS.AES.encrypt(
            srcs,
            this.aesKey,
            this.cryptoCfg
        );
        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    }

    public decrypt2Str(base64String: string): string {
        let res = "";
        try {
            const decrypt = CryptoJS.AES.decrypt(
                base64String,
                this.aesKey,
                this.cryptoCfg
            );
            res = decrypt.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            res = base64String;
            printLog.error("reoCrypto.ts > recover2Str: ", error);
        }
        return res;
    }

    public decrypt(base64String: string) {
        const decrypt = CryptoJS.AES.decrypt(
            base64String,
            this.aesKey,
            this.cryptoCfg
        );
        const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedStr);
    }
}

export const reoCrypto = new ReoCrypto(
    __MAIN_CONFIG__.clientConfig.companyName || "singleton"
);
