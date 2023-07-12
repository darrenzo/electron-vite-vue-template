import { createI18n } from "vue-i18n";
import { PACKAGE } from "@config/index";
import { EnumList } from "../types";

const FALLBACK_LOCALE = EnumList.EInternationalCode.en;

async function loadLocaleMessages(
    lang: EnumList.EInternationalCode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<Record<string, any>> {
    const defaultLocale = await import(`./locales/${lang}.json`);

    let clientLocale;

    if (PACKAGE === "client") {
        const appProtocol = __CONFIG__.clientConfig.appProtocol;
        try {
            if (appProtocol !== "reolink") {
                clientLocale = await import(
                    `./locales/${appProtocol}/${lang}.json`
                );
            }
        } catch (error) {
            console.error(
                `i18n.ts > loadLocaleMessages ${appProtocol}: `,
                error
            );
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messages: Record<string, any> = {};

    if (clientLocale) {
        let fallbackLocale;
        try {
            fallbackLocale = await import(`./locales/${FALLBACK_LOCALE}.json`);
        } catch (error) {
            console.error(
                "i18n.ts > loadLocaleMessages > locales.keys: ",
                error
            );
        }

        const localeLang = Object.assign(
            defaultLocale,
            fallbackLocale ? fallbackLocale : {},
            clientLocale
        );

        messages[lang] = localeLang;
    } else {
        messages[lang] = defaultLocale;
    }

    return messages;
}

export const i18nCreator = async (lang = EnumList.EInternationalCode.en) => {
    const messages = await loadLocaleMessages(lang);
    return createI18n({
        legacy: false,
        locale: lang,
        fallbackLocale: FALLBACK_LOCALE,
        messages: messages,
    });
};
